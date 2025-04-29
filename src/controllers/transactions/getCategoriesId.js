import httpErrors from 'http-errors';
import getById from '../../services/getCategoriesId.js';

export const getCategoryById = async (req, res) => {
  const { categorieId } = req.params;
  const categorie = await getById(categorieId, req.categorie.id);
  if (!categorie) {
    throw httpErrors(404, 'Categorie not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found categorie with id ${categorieId}!`,
    data: categorie,
  });
};
