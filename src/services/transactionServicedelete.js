import { Transaction } from '../db/models/transactions.js'; 

export const removeTransaction = async (id) => {
  const transaction = await Transaction.findByIdAndDelete(id);
  if (!transaction) {
    throw new Error('Transaction not found');
  }
};
