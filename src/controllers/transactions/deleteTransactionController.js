
import { removeTransaction } from '../../services/transactionService.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const deleteTransaction = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  await removeTransaction(id);
  res.status(200).json({ status: 'success', message: 'Transaction deleted' });
});
