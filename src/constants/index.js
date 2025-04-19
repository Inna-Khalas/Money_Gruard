import path from 'node:path';

export const CATEGORIES = [
  'Main expenses',
  'Products',
  'Car',
  'Self care',
  'Child care',
  'Household products',
  'Education',
  'Leisure',
  'Other expenses',
  'Entertainment',
];

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
