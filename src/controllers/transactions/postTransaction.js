import { createTransaction } from '../../services/transactions.js';

// Controller for creating a new transaction

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
