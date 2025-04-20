import Transaction from '../db/models/transactions.js';

const getTransactions = async (
  userId,
  { page, limit, filters, sortBy, sortOrder },
) => {
  try {
    const skip = (page - 1) * limit;

    const sortOptions = {};
    const validSortFields = ['value', 'type', 'date', 'category'];

    if (validSortFields.includes(sortBy)) {
      sortOptions[sortBy] = sortOrder;
    } else {
      sortOptions['date'] = sortOrder;
    }

    const transactions = await Transaction.find({ owner: userId, ...filters })
      .skip(skip)
      .limit(limit)
      .sort(sortOptions);

    const totalTransactions = await Transaction.countDocuments({
      owner: userId,
      ...filters,
    });

    return { transactions, totalTransactions };
  } catch {
    throw new Error('Server error');
  }
};

const transactionFilters = (query) => {
  const filters = {};

  if (query.value) {
    filters.value = parseFloat(query.value);
  }

  if (query.type) {
    filters.type = query.type;
  }

  if (query.category) {
    filters.category = query.category;
  }

  return filters;
};

export { getTransactions, transactionFilters };
