import { Transaction } from '../db/models/transactions.js';

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

  if (query.minValue && query.maxValue) {
    filters.value = {
      $gte: parseFloat(query.minValue),
      $lte: parseFloat(query.maxValue),
    };
  } else if (query.minValue) {
    filters.value = { $gte: parseFloat(query.minValue) };
  } else if (query.maxValue) {
    filters.value = { $lte: parseFloat(query.maxValue) };
  }

  if (query.type) {
    filters.type = query.type;
  }

  if (query.category) {
    filters.category = query.category;
  }

  if (query.startDate || query.endDate) {
    filters.date = {};
    if (query.startDate) {
      const start = new Date(query.startDate);
      start.setHours(0, 0, 0, 0);
      filters.date.$gte = start;
    }
    if (query.endDate) {
      const end = new Date(query.endDate);
      end.setHours(23, 59, 59, 999);
      filters.date.$lte = end;
    }
  }

  return filters;
};

export { getTransactions, transactionFilters };
