import { CATEGORIES } from '../constants/index.js';
import { Transaction } from '../db/models/transactions.js';

// Get transactions

// Create a new transaction

export const createTransaction = async (payload) => {
  return await Transaction.create(payload);
};

// Put transaction

export const updateTransaction = async (transId, payload) => {
  return await Transaction.findOneAndUpdate({ _id: transId }, payload, {
    new: true,
  });
};

// Delete transactions

export const removeTransaction = async (id) => {
  const transaction = await Transaction.findByIdAndDelete(id);
  if (!transaction) {
    throw new Error('Transaction not found');
  }
};

export const getCategoriesService = async () => {
  try {
    return CATEGORIES;
  } catch (error) {
    console.error('Error in getCategoriesService:', error.message);
    throw new Error('Failed to retrieve categories');
  }
};
