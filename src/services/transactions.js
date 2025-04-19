import { Transaction } from "../db/models/transactions.js";

// Create a new transaction

export const createTransaction = async (paylord) => {
  const data = await Transaction(paylord);
  return data;
};

// Put transaction

export const updateTransaction = async (transId, payload) => { 
    return await Transaction.findOneAndUpdate(
        { _id: transId }, payload, { new: true }
    );
};