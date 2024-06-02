/* eslint-disable */

import React, { useState } from 'react';
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
} from 'react-bootstrap';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { Link, NavLink, useHistory, useParams } from 'react-router-dom';
import useCategory from '../../hooks/useCategory';
import useProductsByCategory from '../../hooks/useProductsByCategory';
import useProductAttributes from '../../hooks/useProductAttributes';
import styles from './CatalogPage.module.css';
import ProductCard from '../../ui/Cards/ProductCard/ProductCard';

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

  let category = categories.find((cat) => cat.category.id === currentCategoryId);

  while (category) {
    path.push(category);
    category = categories.find((cat) => cat.category.id === category?.category.parent?.id);
  }
  return path;
};

export default function CatalogPage() {
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({ priceRange: [0, 1000], color: '', size: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<null | string>(null);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const categories = useCategory();
  const { attributes, loading: attrLoading, error: attrError } = useProductAttributes();
  const { products, loading, error } = useProductsByCategory({
    categoryId: currentCategoryId,
    color: filters.color,
    size: filters.size,
  });

  const handleBreadcrumbClick = (categoryId: string | null) => {
    setCurrentCategoryId(categoryId);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const handleResetFilters = () => {
    setFilters({ priceRange: [0, 1000], color: '', size: '' });
  };

  const handleSortChange = (option: string | null) => {
    console.log(option);
  };

  const handleCategoryDropDown = (categoryId: string | null) => {
    setCurrentCategoryId(categoryId);
    history.push(categoryId ? `/category/${categoryId}` : '/catalog');
  };

  console.log(attributes);

  const getCategoryName = (category: Category | undefined) => {
    console.log(
      'Cat name:',
      category?.name['en-GB'] || category?.name['en-US'] || category?.name['de-DE'] || 'Unnamed Category',
    );

    return category?.name['en-GB'] || category?.name['en-US'] || category?.name['de-DE'] || 'Unnamed Category';
  };

  const breadcrumbPath = generateBreadcrumbPath(categories, currentCategoryId);

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
                            <Form.Group controlId="formPriceRange">
                              <Form.Label>Price Range</Form.Label>
                              <Form.Control
                                type="range"
                                min="0"
                                max="1000"
                                value={filters.priceRange[0]}
                                // onChange={(e) => handleFilterChange('priceRange', [0, Number(e.target.value)])}
                              />
                            </Form.Group>

                            <Form.Group controlId="formColor">
                              <Form.Label>Color</Form.Label>
                              <Form.Control
                                as="select"
                                value={filters.color}
                                onChange={(e) => handleFilterChange('color', e.target.value)}
                              >
                                <option value="">All</option>
                                {attributes.colors.map((color) => {
                                  const firstValue = Object.values(color)[0];
                                  return (
                                    <option key={color} value={color}>
                                      {firstValue}
                                    </option>
                                  );
                                })}
                              </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formSize">
                              <Form.Label>Size</Form.Label>
                              <Form.Control
                                as="select"
                                value={filters.size}
                                onChange={(e) => handleFilterChange('size', e.target.value)}
                              >
                                {/* <option value="">All</option>
                                {attributes.sizes.map((size) => (
                                  <option key={size} value={size}>
                                    {size}
                                  </option>
                                ))} */}
                              </Form.Control>
                            </Form.Group>

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
          <Col lg={6}>
            <Row>
              <Col lg={12}>
                <Row className={styles.catalogGrid}>
                  {error && <div>{error}</div>}
                  {!loading && !error && products.length > 0
                    ? products.map((product) => {
                        const imageLink = product.masterVariant?.images?.[0]?.url ?? '';
                        const description = truncateToSentence(product.description?.['en-GB'] ?? '');
                        const name = product.name?.['en-GB'] ?? '';
                        return (
                          <ProductCard
                            key={product.id}
                            name={name}
                            imageLink={imageLink}
                            description={description}
                            id={product.id}
                            price="100 EUR"
                            discountPrice="150 EUR"
                          />
                        );
                      })
                    : categories.map((category) => {
                        const imageLink = category?.product?.masterVariant?.images?.[0]?.url ?? '';
                        const description = truncateToSentence(category?.product?.description?.['en-GB'] ?? '');
                        const name = category?.product?.name?.['en-GB'] ?? '';
                        return (
                          <ProductCard
                            key={category.product?.id}
                            name={name}
                            imageLink={imageLink}
                            description={description}
                            id={category.product?.id}
                            price="100 EUR"
                            discountPrice="150 EUR"
                          />
                        );
                      })}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
