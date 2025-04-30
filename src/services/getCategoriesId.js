import Category from '../db/models/category.js';

export const getById = async (categorieId) => {
  return await Category.findOne({ _id: categorieId });
};
