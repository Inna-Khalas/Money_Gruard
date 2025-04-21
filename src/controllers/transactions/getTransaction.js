import {
  getTransactions,
  transactionFilters,
} from '../../services/getTransactions.js';

const getTransactionsController = async (req, res) => {
  const userId = '680392deb4ce81757858c61e'; // в основной базе будет req.user._id

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const filters = transactionFilters(req.query);

  const sortBy = req.query.sortBy || 'date';
  const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

  const { transactions, totalTransactions } = await getTransactions(userId, {
    page,
    limit,
    filters,
    sortBy,
    sortOrder,
  });

  if (transactions.length === 0) {
    return res.status(404).json({
      status: '404',
      message: 'Transactions not found',
      data: [],
    });
  }

  res.status(200).json({
    status: '200',
    message: 'Transactions successfully found',
    data: transactions,
    pagination: {
      totalTransactions,
      currentPage: page,
      totalPages: Math.ceil(totalTransactions / limit),
      limit,
    },
  });
};

export default getTransactionsController;
