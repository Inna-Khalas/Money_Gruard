import {
  createTransaction,
  getCategoriesService,
  removeTransaction,
} from '../../services/transactions.js';

// Get Categories

const getCategories = async (req, res) => {
  const categories = await getCategoriesService();
  res.status(200).json({ success: true, data: categories });
};

export default getCategories;

// Create a new transaction

export const createTransactionController = async (req, res) => {
  const { _id: owner } = req.user;
  const transactionData = { ...req.body, owner };

  const result = await createTransaction(transactionData);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a transaction!',
    data: result,
  });
};

// Delete transaction

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  await removeTransaction(id);
  res.status(200).json({ status: 'success', message: 'Transaction deleted' });
};
