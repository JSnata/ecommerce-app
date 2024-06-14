import { toast } from 'react-toastify';
import { Cart, CartAddLineItemAction, type CartUpdateAction } from '@commercetools/platform-sdk';
import { apiRoot } from './helpers/ClientAPI';

export default class CartService {
  static cartData: Cart | null = null;

  static currentCartId: string;

  static async start() {
    const id = localStorage.getItem('cartId');
    if (id) {
      await this.initCartByID(id);
    } else {
      await this.initAnonymousCart();
    }
  }

  static async initCartByID(id: string) {
    this.cartData = await CartService.getCartByID(id);
    console.log('cart by id', this.cartData);
    if (this.cartData) {
      this.currentCartId = this.cartData?.id;
    }
  }

  static async initAnonymousCart() {
    const cart = await CartService.createAnonymousCart();
    if (cart) {
      this.cartData = cart;
      this.currentCartId = cart.id;
      localStorage.setItem('cartId', this.currentCartId);
    }
  }

  static async createAnonymousCart() {
    try {
      const cart = await apiRoot
        .carts()
        .post({
          body: {
            currency: 'EUR',
          },
        })
        .execute();
      console.log('Анонимная корзина создана:', cart.body.id, cart.body);
      return cart.body;
    } catch (err) {
      console.error(err);
      toast.error(`${err}`);
      return null;
    }
  }

  static async getCartByID(id: string) {
    try {
      const response = await apiRoot.carts().withId({ ID: id }).get().execute();
      console.log('Найдена корзина по ID', id, response);
      return response.body;
    } catch (err) {
      console.error(err);
      toast.error(`${err}`);
      return null;
    }
  }

  static setCartIdToLocalStorage(id: string) {
    localStorage.setItem('cartId', id);
  }

  static async mergeCart(customerCartId: string, customerCartVersion: number) {
    try {
      const anonymousCart = await this.getCartByID(this.currentCartId);
      if (!anonymousCart) {
        console.error('Ошибка при поиске анонимеой корзины');
        return;
      }
      const updateActions = anonymousCart.lineItems.map(
        (lineItem) =>
          ({
            action: 'addLineItem',
            ...lineItem,
          }) as CartAddLineItemAction,
      );
      const updatedCart = await apiRoot
        .carts()
        .withId({ ID: customerCartId })
        .post({
          body: {
            version: customerCartVersion,
            actions: updateActions,
          },
        })
        .execute();
      console.log('Корзины объединены:', updatedCart.body.id);
    } catch (err) {
      console.error('Ошибка при объединении корзин:', err);
      toast.error(`${err}`);
    }
  }

  static async getCartId() {
    if (!this.currentCartId) {
      await this.start();
      return this.currentCartId;
    }
    return this.currentCartId;
  }

  static async getCartVersion() {
    if (!this.cartData) {
      await this.start();
      return this.cartData!.version;
    }
    await this.updateCartData();
    return this.cartData.version;
  }

  static async updateCartData() {
    try {
      const newCartData = await (async () => {
        try {
          const cart = await this.getCartByID(this.currentCartId);
          if (cart) {
            return cart;
          }
        } catch (err) {
          console.error(err);
          toast.error(`${err}`);
        }
        return undefined;
      })();

      if (newCartData !== undefined) {
        this.cartData = newCartData;
      }
    } catch (err) {
      console.error(err);
      toast.error(`${err}`);
    }
  }

  static async getCartItems() {
    try {
      const cartId = await this.getCartId();
      const response = await apiRoot
        .carts()
        .withId({ ID: cartId })
        .get({
          queryArgs: {
            expand: 'lineItems[*].product',
          },
        })
        .execute();
      return response.body;
    } catch (err) {
      console.error(err);
      toast.error(`${err}`);
      return null;
    }
  }

  static async addToCart(productId: string) {
    try {
      const productResponse = await apiRoot.productProjections().withId({ ID: productId }).get().execute();
      const product = productResponse.body;
      if (!product) {
        console.error('Product not found');
        return null;
      }
      console.log(product);
      const versionCart = await this.getCartVersion();
      const cartId = await this.getCartId();
      return await apiRoot
        .carts()
        .withId({ ID: cartId })
        .post({
          body: {
            version: versionCart,
            actions: [
              {
                action: 'addLineItem',
                productId,
                variantId: Number(product.id),
                quantity: 1,
              },
            ],
          },
        })
        .execute();
    } catch (err) {
      console.error('Error adding item to cart:', err);
      toast.error(`${err}`);
      return null;
    }
  }

  static async removeFromCart(lineItemId: string) {
    try {
      const versionCart = await this.getCartVersion();
      const response = await apiRoot
        .carts()
        .withId({ ID: this.currentCartId! })
        .post({
          body: {
            version: versionCart,
            actions: [{ action: 'removeLineItem', lineItemId }],
          },
        })
        .execute();
      return response.body;
    } catch (err) {
      console.error('Error removing item from cart:', err);
      toast.error(`${err}`);
      return null;
    }
  }

  static async changeLineItemQuantity(lineItemId: string, quantity: number) {
    try {
      const versionCart = await this.getCartVersion();
      const response = await apiRoot
        .carts()
        .withId({ ID: this.currentCartId! })
        .post({
          body: {
            version: versionCart,
            actions: [{ action: 'changeLineItemQuantity', lineItemId, quantity }],
          },
        })
        .execute();
      return response.body;
    } catch (err) {
      console.error('Error update quantity in cart:', err);
      toast.error(`${err}`);
      return null;
    }
  }

  static async clearCart(cart: Cart) {
    const updateActions: CartUpdateAction[] = cart.lineItems.map((lineItem) => ({
      action: 'removeLineItem',
      lineItemId: lineItem.id,
    }));
    try {
      const versionCart = await this.getCartVersion();
      const response = await apiRoot
        .carts()
        .withId({ ID: this.currentCartId! })
        .post({
          body: {
            version: versionCart,
            actions: updateActions,
          },
        })
        .execute();
      return response.body;
    } catch (err) {
      console.error('Error clear cart:', err);
      toast.error(`${err}`);
      return null;
    }
  }

  static async getAllActivePromo() {
    try {
      const response = await apiRoot
        .discountCodes()
        .get({ queryArgs: { where: 'isActive=true' } })
        .execute();
      return response.body.results;
    } catch (err) {
      console.error('Error clear cart:', err);
      toast.error(`${err}`);
      return null;
    }
  }
}
// CartService.start();
// export default async function createShippingCart(id: string | undefined = undefined) {
//   localStorage.setItem('cartId', id);
//   const cart = new CartService(id);
//   if (id) {
//     await cart.initCartByID(id);
//   } else {
//     await cart.initAnonymousCart();
//   }
//   return cart;
// }
