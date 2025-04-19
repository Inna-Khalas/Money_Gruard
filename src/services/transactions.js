import transactionSchema from '../db/models/transactions.js';
import mongoose from 'mongoose';

export const TransactionsCollections =
  mongoose.models.Transaction ||
  mongoose.model('Transaction', transactionSchema);

// Create a new transaction

export const createTransaction = async (payload) => {
  const data = await TransactionsCollections.create(payload);
  return data;
};
