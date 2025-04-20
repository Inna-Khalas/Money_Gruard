import createHttpError from "http-errors";

import { updateTransaction } from "../../services/transactions.js";

export const putTransactionController = async (req, res, next) => {
    const { id } = req.params;
    const updatedTransaction = await updateTransaction(id, { ...req.body });
    console.log(updatedTransaction);
    
    if (!updatedTransaction) {
        throw createHttpError(404, 'Transaction not found');
    }

    res.json({
        status: 200,
        message: 'Successfully patched a transaction!',
        data: updatedTransaction
    });
};