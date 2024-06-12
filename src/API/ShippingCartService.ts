import { toast } from 'react-toastify';
import { Cart } from '@commercetools/platform-sdk';
import { apiRoot } from './helpers/ClientAPI';

export default class ShippingCartService {
  static cartData: Cart | null = null;

  static currentCartId: string | undefined = undefined;

  static start() {
    const id = localStorage.getItem('cartId');
    if (id) {
      this.initCartByID(id);
    } else {
      this.initAnonymousCart();
    }
  }

  static async initCartByID(id: string) {
    this.cartData = await ShippingCartService.getCartByID(id);
    this.currentCartId = this.cartData?.id;
  }

  static async initAnonymousCart() {
    const cart = await ShippingCartService.createAnonymousCart();
    if (cart) {
      this.cartData = cart.body;
      this.currentCartId = cart.body?.id;
      localStorage.setItem('cartId', this.currentCartId);
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
      return cart;
    } catch (err) {
      console.error(err);
      toast.error(`${err}`);
      return null;
    }
  }

  // static async mergeAnonymousCart() {
  //   try {
  //     const cart = await apiRoot
  //       .customers()
  //       .withId({ ID: customerId })
  //       .post({
  //         body: {
  //           version: customerVersion,
  //           actions: [
  //             {
  //               action: 'set',
  //               anonymousCart: {
  //                 id: this.currentCartId,
  //                 typeId: 'cart',
  //               },
  //             },
  //           ],
  //         },
  //       })
  //       .execute();
  //
  //     console.log('Корзины объединены:', cart.id);
  //     return cart;
  //   } catch (error) {
  //     console.error('Ошибка при объединении корзин:', error);
  //     throw error;
  //   }
  // }
}
// ShippingCartService.start();
// export default async function createShippingCart(id: string | undefined = undefined) {
//   localStorage.setItem('cartId', id);
//   const cart = new ShippingCartService(id);
//   if (id) {
//     await cart.initCartByID(id);
//   } else {
//     await cart.initAnonymousCart();
//   }
//   return cart;
// }
