import createHttpError from 'http-errors';
import {
  createTransaction,
  getCategoriesService,
  getSummary,
  getTransactions,
  removeTransaction,
  transactionFilters,
  updateTransaction,
} from '../../services/transactions.js';
import { CATEGORIES } from '../../constants/index.js';

// Get Categories

export const getCategories = async (req, res) => {
  const categories = await getCategoriesService();
  res.status(200).json({ success: true, data: categories });
};

// Get Categories

export const getCategoryById = (req, res) => {
  const { id } = req.params;

  const index = parseInt(id, 10);

  if (isNaN(index) || index < 0 || index >= CATEGORIES.length) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.json({ id, name: CATEGORIES[index] });
};

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

// Put transactions

export const putTransactionController = async (req, res, next) => {
  const { id } = req.params;
  const ownerId = req.user.id; // <-req.user.id
  const updatedTransaction = await updateTransaction(id, ownerId, {
    ...req.body,
  });

  if (!updatedTransaction) {
    throw createHttpError(404, 'Transaction not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a transaction!',
    data: updatedTransaction,
  });
};

// Delete transaction

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  await removeTransaction(id);
  res.status(200).json({ status: 'success', message: 'Transaction deleted' });
};

// Get Transactions

export const getTransactionsController = async (req, res) => {
  const userId = req.user._id; // в основной базе будет req.user._id

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const filters = transactionFilters(req.query);

  const sortBy = req.query.sortBy || 'date';
  const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

  const { transactions, totalTransactions } = await getTransactions(userId, {
    page,
    limit,
    filters,
    sortBy,
    sortOrder,
  });

  if (transactions.length === 0) {
    return res.status(404).json({
      status: '404',
      message: 'Transactions not found',
      data: [],
    });
  }

  res.status(200).json({
    status: '200',
    message: 'Transactions successfully found',
    data: transactions,
    pagination: {
      totalTransactions,
      currentPage: page,
      totalPages: Math.ceil(totalTransactions / limit),
      limit,
    },
  });
};

// Get Summary

export const getSummaryController = async (req, res) => {
  const { period } = req.query;
  const { _id: owner } = req.user;

  if (!period || !/^\d{4}-\d{2}$/.test(period)) {
    return res
      .status(400)
      .json({ message: 'Invalid or missing period format (YYYY-MM)' });
  }

  const result = await getSummary(owner, period);
  res.json(result);
};
