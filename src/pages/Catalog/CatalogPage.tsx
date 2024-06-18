import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
  Collapse,
  Dropdown,
  DropdownButton,
  Container,
  Breadcrumb,
  Pagination,
} from 'react-bootstrap';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { Link, NavLink, useHistory } from 'react-router-dom';
import useCategory from '../../hooks/useCategory';
import useProductsByCategory from '../../hooks/useProductsByCategory';
import styles from './CatalogPage.module.css';
import ProductCard from '../../ui/Cards/ProductCard/ProductCard';
import Attributes from './attributes';
import useCart from '../../hooks/useCart';

function truncateToSentence(text: string) {
  const match = text.match(/(.*?\.)(\s|$)/);
  return match ? match[1] : text;
}

export type CategoryWithProduct = {
  category: Category;
  product: ProductProjection | null;
};

const generateBreadcrumbPath = (categories: CategoryWithProduct[], currentCategoryId: string | null) => {
  const path: CategoryWithProduct[] = [];

  path.push({
    category: {
      id: '',
      name: { 'en-GB': 'Catalog' },
      version: 0,
      createdAt: '',
      lastModifiedAt: '',
      slug: { 'en-GB': '' },
      ancestors: [],
      orderHint: '',
    },
    product: null,
  });

  const findCategoryById = (id: string | null) => {
    return categories.find((cat) => cat.category.id === id);
  };

  let category = findCategoryById(currentCategoryId);

  while (category) {
    path.push(category);
    category = findCategoryById(category.category.parent?.id || null);
  }

  return path;
};

export default function CatalogPage() {
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({ 'color-flower': '', 'size-flower': '' });
  const [showFilters, setShowFilters] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<null | string>(null);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const history = useHistory();
  const categories = useCategory();
  const { products, loading, error, totalPages } = useProductsByCategory({
    categoryId: currentCategoryId,
    colorFlower: filters['color-flower'],
    sizeFlower: filters['size-flower'],
    sort: sortOption,
    search: searchInput,
    page: currentPage,
    pageSize,
  });
  const { addToCart, removeFromCart, isInCart } = useCart();

  useEffect(() => {}, [filters, sortOption]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [products]);

  const handleBreadcrumbClick = (categoryId: string | null) => {
    setCurrentCategoryId(categoryId);
    setCurrentPage(1);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({ ...filters, [filterName]: value });
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({ 'color-flower': '', 'size-flower': '' });
    setCurrentPage(1);
  };

  // const handleAddToCart = (id: string) => {
  //   setCart([...cart, id]);
  // };

  // const isProductInCart = (id: string) => cart.includes(id);

  const handleSortChange = (option: string | null) => {
    let sortOpt = null;
    switch (option) {
      case 'price-asc':
        sortOpt = 'price asc';
        break;
      case 'price-desc':
        sortOpt = 'price desc';
        break;
      case 'name-asc':
        sortOpt = 'name.en-gb asc';
        break;
      case 'name-desc':
        sortOpt = 'name.en-gb desc';
        break;
      default:
        sortOpt = null;
    }
    setSortOption(sortOpt);
    setCurrentPage(1);
  };

  const handleCategoryDropDown = (categoryId: string | null) => {
    setCurrentCategoryId(categoryId);
    history.push(categoryId ? `/category/${categoryId}` : '/catalog');
  };

  const getCategoryName = (category: Category | undefined) => {
    return category?.name['en-GB'] || category?.name['en-US'] || category?.name['de-DE'] || 'Catalog';
  };

  const breadcrumbPath = generateBreadcrumbPath(categories, currentCategoryId);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Row>
      <Col>
        <Row>
          <Col className={styles.subHeader}>
            <Container>
              <Row className="gap-3 gap-lg-0">
                <Col lg={6}>
                  <div className={styles.searchWrapper}>
                    <InputGroup>
                      <FormControl
                        placeholder="Search for products..."
                        value={searchInput}
                        className={styles.searchBar}
                        onChange={handleSearchInputChange}
                      />
                    </InputGroup>
                  </div>
                </Col>

                <Col lg={6}>
                  <section className={styles.filtersSection}>
                    <div>
                      <Button variant="dark" onClick={() => setShowFilters(!showFilters)}>
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                      </Button>
                    </div>
                    <div>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Sort By"
                        variant="dark"
                        onSelect={handleSortChange}
                      >
                        <Dropdown.Item eventKey="price-asc">Price: Low to High</Dropdown.Item>
                        <Dropdown.Item eventKey="price-desc">Price: High to Low</Dropdown.Item>
                        <Dropdown.Item eventKey="name-asc">Name: A to Z</Dropdown.Item>
                        <Dropdown.Item eventKey="name-desc">Name: Z to A</Dropdown.Item>
                      </DropdownButton>
                    </div>
                    <div>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title={
                          currentCategoryId
                            ? categories.find((cat) => cat.category.id === currentCategoryId)?.category.name['en-GB'] ||
                              'Categories'
                            : 'Categories'
                        }
                        variant="dark"
                        onSelect={handleCategoryDropDown}
                      >
                        <Dropdown.Item eventKey={undefined}>All Categories</Dropdown.Item>
                        {categories &&
                          categories.map((category) => (
                            <Dropdown.Item key={category.category.id} eventKey={category.category.id}>
                              {getCategoryName(category.category)}
                            </Dropdown.Item>
                          ))}
                      </DropdownButton>
                    </div>
                  </section>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Collapse in={showFilters}>
                    <Row>
                      <Col>
                        <div className={styles.filtersItemsFormBlock}>
                          <h4>Filters</h4>
                          <Form className={styles.filtersItemsForm}>
                            <Attributes onChange={handleFilterChange} />
                            <Button variant="dark" onClick={handleResetFilters}>
                              Reset Filters
                            </Button>
                          </Form>
                        </div>
                      </Col>
                    </Row>
                  </Collapse>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container className="mt-3">
              <Row>
                <Container>
                  <Breadcrumb className={styles.breadcrumbs}>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
                      Home
                    </Breadcrumb.Item>
                    {breadcrumbPath.map((category, index) => {
                      const link = category.category.id ? `/category/${category.category.id}` : '/catalog/';
                      return (
                        <Breadcrumb.Item
                          key={category.category.id}
                          linkAs={NavLink}
                          linkProps={{ to: link }}
                          onClick={() => handleBreadcrumbClick(category.category.id)}
                          active={index === breadcrumbPath.length - 1}
                        >
                          {getCategoryName(category.category)}
                        </Breadcrumb.Item>
                      );
                    })}
                  </Breadcrumb>
                </Container>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col lg={6} className={styles.imageCol}>
            <div
              className={styles.imageContainer}
              style={{
                backgroundImage: `url(${categories[3]?.product?.masterVariant?.images?.[0]?.url || categories?.[3]?.product?.masterVariant?.images?.[0]?.url || ''})`,
              }}
            >
              <div className={styles.content}>
                <h2>
                  {getCategoryName(categories.find((cat) => cat.category.id === currentCategoryId)?.category) ||
                    'Catalog'}
                </h2>
              </div>
            </div>
          </Col>
          <Col lg={6} className={styles.catalogWrapper}>
            <Row>
              <Col className={styles.catalogItemsWrapper}>
                <Row>
                  {loading && <p>Loading products...</p>}
                  {error && <p>Error loading products: {error}</p>}
                  {!loading &&
                    !error &&
                    products.map((product) => {
                      const productDescription = product.description
                        ? truncateToSentence(product.description['en-GB'] || '')
                        : '';
                      const productPriceCurr = product?.masterVariant?.prices?.[0]?.value?.centAmount;
                      const digit = product?.masterVariant?.prices?.[0]?.value?.fractionDigits;
                      const productCode = product?.masterVariant?.prices?.[0]?.value?.currencyCode;
                      const productDiscountPrice = product?.masterVariant?.prices?.[0]?.discounted?.value?.centAmount;
                      const calculatePrice = (price: number | undefined, digits: number | undefined) => {
                        return price && digits ? (price / 10 ** digits).toFixed(digits) : 0;
                      };
                      const productPrice = calculatePrice(productPriceCurr, digit);
                      const productDiscount = calculatePrice(productDiscountPrice, digit);
                      return (
                        <ProductCard
                          key={product.id}
                          id={product.id}
                          name={product.name['en-GB']}
                          imageLink={product?.masterVariant?.images?.[0]?.url ?? ''}
                          description={productDescription}
                          price={productPrice}
                          productCode={productCode}
                          productDiscount={productDiscount}
                          productDiscountPrice={productDiscountPrice}
                          isInCart={isInCart(product.id)}
                          handleAddToCart={addToCart}
                          handleDeleteFromCart={removeFromCart}
                        />
                      );
                    })}
                </Row>
              </Col>
            </Row>
            {totalPages > 1 && (
              <Row className="justify-content-center my-3">
                <Col md={12} className="d-flex justify-content-center">
                  <Pagination>
                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {[...Array(totalPages)].map((_, pageIndex) => {
                      const pageNumber = pageIndex + 1;
                      return (
                        <Pagination.Item
                          key={pageNumber}
                          active={pageNumber === currentPage}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </Pagination.Item>
                      );
                    })}
                    <Pagination.Next
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
