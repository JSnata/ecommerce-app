import React, { useEffect, useState } from 'react';
import { AttributeDefinition, LocalizedString } from '@commercetools/platform-sdk';
import { Form } from 'react-bootstrap';
import { apiRoot } from '../../API/helpers/ClientAPI';

function Attributes() {
  const [attr, setAttr] = useState<AttributeDefinition[]>([]);

  async function fetchAllAttributes() {
    try {
      const response = await apiRoot.productTypes().get().execute();
      const productTypes = response.body.results;
      const allAttributes = productTypes
        .filter((productType) => productType.name === 'Flower')
        .flatMap((type) => type.attributes || []);

      console.log(allAttributes);
      return allAttributes;
    } catch (error) {
      console.error('Error fetching attributes:', error);
      throw error;
    }
  }

  useEffect(() => {
    fetchAllAttributes()
      .then((allAttributes) => {
        console.log('Attributes:', allAttributes);
        setAttr(allAttributes);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function getProductsByAttributeValue(attributeName: string, attributeValue: string) {
    try {
      const response = await apiRoot
        .products()
        .get({
          queryArgs: {
            where: `variants(attributes(name="${attributeName}", value="${attributeValue}"))`,
          },
        })
        .execute();

      return response.body.results;
    } catch (error) {
      throw new Error(`Could not fetch products: ${error}`);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function searchProductsByPriceRange(minPrice: number, maxPrice: number, currencyCode: string) {
    try {
      const response = await apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: [
              `variants.price.centAmount:range (${minPrice} to ${maxPrice})`,
              `variants.price.currencyCode:"${currencyCode}"`,
            ],
          },
        })
        .execute();

      return response.body.results;
    } catch (error) {
      throw new Error(`Error during product search: ${error}`);
    }
  }

  function getLocalizedString(label: LocalizedString | string, locale: string): string {
    if (typeof label === 'string') {
      return label;
    }
    return label[locale] || label['en-GB'] || '';
  }

  return (
    <div>
      {attr.length > 0 &&
        attr.map((elem, index) => {
          return (
            <Form.Group controlId={`attribute-${index}`} key={elem.name}>
              <Form.Label>{elem.label['en-GB']}</Form.Label>
              <Form.Control as="select" defaultValue="" onChange={() => {}}>
                <option value="">All</option>
                {'elementType' in elem.type &&
                  'values' in elem.type.elementType &&
                  elem.type.elementType.values.map((valueObj) => {
                    return (
                      <option key={valueObj.key} value={valueObj.key} style={{ backgroundColor: valueObj.key }}>
                        {getLocalizedString(valueObj.label, 'en-GB') || valueObj.key}
                      </option>
                    );
                  })}
              </Form.Control>
            </Form.Group>
          );
        })}
    </div>
  );
}

export default Attributes;
