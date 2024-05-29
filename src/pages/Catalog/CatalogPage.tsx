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
} from 'react-bootstrap';
import useCategory from '../../hooks/useCategory';
import styles from './CatalogPage.module.css';
import ProductCard from '../../ui/Cards/ProductCard/ProductCard';
import useProductsByCategory from '../../hooks/useProductsByCategory';

function truncateToSentence(text: string) {
  const match = text.match(/(.*?\.)(\s|$)/);
  return match ? match[1] : text;
}

export default function CatalogPage() {
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({ priceRange: [0, 1000], brand: '', color: '', size: '' });
  const [attributes, setAttributes] = useState({ brands: [], colors: [], sizes: [] });
  const [showFilters, setShowFilters] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<null | string>(null);

  const categories = useCategory();
  const { products, loading, error } = useProductsByCategory(currentCategoryId);

  useEffect(() => {
    async function getAttributes() {
      const attrs = { brands: [], colors: [], sizes: [] };
      setAttributes(attrs);
    }
    getAttributes();
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const handleResetFilters = () => {
    setFilters({ priceRange: [0, 1000], brand: '', color: '', size: '' });
  };

  const handleSortChange = (option: string | null) => {
    console.log(option);
  };

  const handleCategoryDropDown = (categoryId: string | null) => {
    setCurrentCategoryId(categoryId);
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
                        id="categories-dd"
                        title="Categories"
                        variant="dark"
                        onSelect={handleCategoryDropDown}
                      >
                        {categories &&
                          categories.map((category) => (
                            <Dropdown.Item key={category.category.id} eventKey={category.category.id}>
                              {category.category.name['en-GB']}
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
                            <Form.Group controlId="formBrand">
                              <Form.Label>Brand</Form.Label>
                              <Form.Control
                                as="select"
                                value={filters.brand}
                                onChange={(e) => handleFilterChange('brand', e.target.value)}
                              >
                                <option value="">All</option>
                                {attributes.brands.map((brand) => (
                                  <option key={brand} value={brand}>
                                    {brand}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formColor">
                              <Form.Label>Color</Form.Label>
                              <Form.Control
                                as="select"
                                value={filters.color}
                                onChange={(e) => handleFilterChange('color', e.target.value)}
                              >
                                <option value="">All</option>
                                {attributes.colors.map((color) => (
                                  <option key={color} value={color}>
                                    {color}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formSize">
                              <Form.Label>Size</Form.Label>
                              <Form.Control
                                as="select"
                                value={filters.size}
                                onChange={(e) => handleFilterChange('size', e.target.value)}
                              >
                                <option value="">All</option>
                                {attributes.sizes.map((size) => (
                                  <option key={size} value={size}>
                                    {size}
                                  </option>
                                ))}
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
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                      Library
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Data</Breadcrumb.Item>
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
                backgroundImage: `url(${products[0]?.masterVariant?.images?.[0]?.url || categories?.[3]?.product?.masterVariant?.images?.[0]?.url || ''})`,
              }}
            >
              <div className={styles.content}>
                <h2>
                  {categories.find((cat) => cat.category.id === currentCategoryId)?.category.name['en-GB'] || 'Catalog'}
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
