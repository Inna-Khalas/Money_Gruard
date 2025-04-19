



import Transaction from '../db/models/transactions.js';  

export const removeTransaction = async (id) => {
  const transaction = await Transaction.findById(id);
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  await Transaction.findByIdAndDelete(id);
};
