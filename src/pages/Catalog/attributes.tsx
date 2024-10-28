import React, { useEffect, useState } from 'react';
import { AttributeDefinition, LocalizedString } from '@commercetools/platform-sdk';
import { Form } from 'react-bootstrap';
import { apiRoot } from '../../API/helpers/ClientAPI';

interface AttributesProps {
  onChange: (filterName: string, value: string) => void;
}

function Attributes({ onChange }: AttributesProps) {
  const [attr, setAttr] = useState<AttributeDefinition[]>([]);

  async function fetchAllAttributes() {
    try {
      const response = await apiRoot.productTypes().get().execute();
      const productTypes = response.body.results;
      const allAttributes = productTypes
        .filter((productType) => productType.name === 'Flower')
        .flatMap((type) => type.attributes || []);
      return allAttributes;
    } catch (error) {
      console.error('Error fetching attributes:', error);
      throw error;
    }
  }

  useEffect(() => {
    fetchAllAttributes()
      .then((allAttributes) => {
        setAttr(allAttributes);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  function handleAttributeChange(attributeName: string, value: string) {
    onChange(attributeName, value);
  }

  function getLocalizedString(label: LocalizedString | string, locale: string): string {
    if (typeof label === 'string') {
      return label;
    }
    return label[locale] || label['en-GB'] || '';
  }

  return (
    <div>
      {attr.length &&
        attr.map((elem, index) => {
          return (
            <Form.Group controlId={`attribute-${index}`} key={elem.name}>
              <Form.Label>{elem.label['en-GB']}</Form.Label>
              <Form.Control
                as="select"
                defaultValue=""
                onChange={(e) => handleAttributeChange(elem.name, e.target.value)}
              >
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
