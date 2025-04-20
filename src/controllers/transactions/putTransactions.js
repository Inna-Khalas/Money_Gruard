import createHttpError from "http-errors";
import { updateTransaction } from "../../services/transactions.js";

export const putTransactionController = async (req, res, next) => {
    const { id } = req.params;
    const ownerId = '680392deb4ce81757858c61e';  // <-req.user.id
    const updatedTransaction = await updateTransaction(id, ownerId, { ...req.body });

    if (!updatedTransaction) {
        throw createHttpError(404, 'Transaction not found');
    }

    res.json({
        status: 200,
        message: 'Successfully patched a transaction!',
        data: updatedTransaction
    });
};