






const Transaction = require('../db/models/transactions'); 

exports.removeTransaction = async (id) => {
  const transaction = await Transaction.findById(id);
  if (!transaction) {
    throw new Error('Transaction not found');
  }

  await Transaction.findByIdAndDelete(id);
};
