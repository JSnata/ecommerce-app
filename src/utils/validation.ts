import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import postalCodes from 'postal-codes-js';
import { IAddressValuesValidation, IProfileValuesValidation } from '../types/CustomerTypes';

const emailSchema = yup
  .string()
  .required('This field is required!')
  .email('Invalid email')
  .matches(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email must be xxx@xxx.xx');

const passwordSchema = yup
  .string()
  .required('This field is required!')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one digit');

const nameSchema = yup
  .string()
  .required('This field is required!')
  .min(1, 'Must contain at least 1 character')
  .matches(/^[^0-9]*$/, 'Field must not contain numbers')
  .matches(/^[^!@#$%^&-+=№;:")(]*$/, 'Field must not contain special characters');

const dateOfBirthSchema = yup
  .date()
  .required('This field is required!')
  .max(new Date(new Date().setFullYear(new Date().getFullYear() - 14)), 'You must be at least 14 years old')
  .test('check-age', 'You must be at least 14 years old', (value) => {
    const cutoffDate = new Date(new Date().setFullYear(new Date().getFullYear() - 14));
    return new Date(value) <= cutoffDate;
  });

export const profileValidationSchema: ObjectSchema<IProfileValuesValidation> = yup.object().shape({
  email: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  dateOfBirth: dateOfBirthSchema,
});

export const passwordValidationSchema = yup.object().shape({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const addressSchema = yup
  .string()
  .required('ProfileAddressCard is required!')
  .min(1, 'Must contain at least 1 character')
  .matches(/^[^!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/, 'ProfileAddressCard must not contain special characters');

const citySchema = yup
  .string()
  .required('City is required!')
  .min(1, 'Must contain at least 1 character')
  .matches(/^[^0-9]*$/, 'City must not contain numbers')
  .matches(/^[^!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]*$/, 'City must not contain special characters');

const postalCodeSchema = (countryCode: string | unknown) =>
  yup
    .string()
    .required('Postal code is required!')
    .test('postal-code-validation', 'Wrong format', (value) => {
      const countryString = typeof countryCode === 'string' ? countryCode.trim() : '';
      if (!countryString) return false;
      const validationResult = postalCodes.validate(countryString, value);
      return validationResult === true;
    });

const countrySchema = yup.string().required('Country is required!');

export const addressValidationSchema: ObjectSchema<IAddressValuesValidation> = yup
  .object()
  .shape({
    city: citySchema,
    streetName: addressSchema,
    country: countrySchema,
    postalCode: yup.string().when('country', (country) => postalCodeSchema(country[0])),
  })
  .noUnknown();
