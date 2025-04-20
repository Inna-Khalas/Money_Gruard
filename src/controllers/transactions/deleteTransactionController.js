import { removeTransaction } from '../../services/transactionServicedelete.js';  // поправил импорт (Андрей)
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';  

export const deleteTransaction = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  try {
    await removeTransaction(id);  
    res.status(200).json({ status: 'success', message: 'Transaction deleted' });
  } catch (error) {
    console.log(error); // долбавил лог еррора чтоб файл не краснел (Андрей)
    res.status(500).json({ status: 'error', message: 'Failed to delete transaction' });
  }
});
