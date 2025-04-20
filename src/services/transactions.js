import { Transaction } from "../db/models/transactions.js";

// Create a new transaction

export const createTransaction = async (payload) => {
  return await Transaction.create(payload);
};

// Put transaction

export const updateTransaction = async (transId, ownerId, payload) => { 
    return await Transaction.findOneAndUpdate(
        { _id: transId, owner: ownerId }, payload, { new: true }
    );
};