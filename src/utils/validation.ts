import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { IProfileValuesValidation } from '../types/CustomerTypes';

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

const addressSchema = yup.string().required('This field is required!').min(1, 'Must contain at least 1 character');

const citySchema = yup
  .string()
  .required('This field is required!')
  .min(1, 'Must contain at least 1 character')
  .matches(/^[^0-9]*$/, 'Field must not contain numbers')
  .matches(/^[^!@#$%^&-+=№;:")(]*$/, 'Field must not contain special characters');

const postalCodeSchema = (country: string) =>
  yup
    .string()
    .required('This field is required!')
    .test('custom-validation', 'Wrong format', (value) => {
      switch (country) {
        case 'Russia':
          return /^([1-6]{1}[0-9]{5})$/.test(value);
        case 'Belarus':
          return /^(2[1-4]{1}[0-7]{1}[0-9]{3})$/.test(value);
        case 'Poland':
          return /^([0-9]{2}-[0-9]{3})$/.test(value);
        default:
          return false;
      }
    });

const profileValidationSchema: ObjectSchema<IProfileValuesValidation> = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  oldPassword: passwordSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  dateOfBirth: dateOfBirthSchema,
  country_billing: yup.string().required('This field is required!'),
  city_billing: citySchema,
  street_billing: addressSchema,
  code_billing: yup.string().when('country_billing', (country) => postalCodeSchema(country as unknown as string)),
});

export default profileValidationSchema;
