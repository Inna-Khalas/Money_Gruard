import { CATEGORIES } from '../../constants/index.js';

export const getCategoryById = (req, res) => {
  const { id } = req.params;

  const index = parseInt(id, 10);

  if (isNaN(index) || index < 0 || index >= CATEGORIES.length) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.json({ id, name: CATEGORIES[index] });
};
