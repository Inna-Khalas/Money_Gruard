import { CategoryCollection } from '../db/models/category.js';
import { Transaction } from '../db/models/transactions.js';
import mongoose from 'mongoose';

// Create a new transaction

const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const createTransaction = async (payload) => {
  if (payload.type === 'expense') {
    if (
      typeof payload.category === 'string' &&
      !mongoose.Types.ObjectId.isValid(payload.category)
    ) {
      const categoryName = capitalizeFirstLetter(payload.category);

      const categoryDoc = await CategoryCollection.findOne({
        name: categoryName,
        type: 'expense',
      });

      if (!categoryDoc) {
        throw new Error(`Category '${categoryName}' not found!`);
      }

      payload.category = categoryDoc._id;
    }
  }
  console.log('Payload before creating transaction:', payload);

  return await Transaction.create(payload);
};

// Put transaction

export const updateTransaction = async (transId, ownerId, payload) => {
  if (payload.category) {
    payload.category = capitalizeFirstLetter(payload.category);
  }

  const updateTransaction = await Transaction.findOneAndUpdate(
    { _id: transId, owner: ownerId },
    payload,
    { new: true },
  ).populate({ path: 'category', select: 'name -_id' });

  return updateTransaction;
};

// Delete transactions

export const removeTransaction = async (id) => {
  const transaction = await Transaction.findByIdAndDelete(id);
  if (!transaction) {
    throw new Error('Transaction not found');
  }
};

// Categories

export const getCategoriesService = async () => {
  try {
    const categories = await CategoryCollection.find({}, { name: 1, type: 1 });
    return categories;
  } catch (error) {
    console.error('Error in getCategoriesService:', error.message);
    throw new Error('Failed to retrieve categories');
  }
};

// get Summary

export const getSummary = async (owner, period) => {
  const [year, month] = period.split('-').map(Number);
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const transactions = await Transaction.find({
    owner,
    date: { $gte: startDate, $lt: endDate },
  }).populate({
    path: 'category',
    select: 'name -_id',
  });

  const categorySummary = {};
  let totalExpense = 0;
  let totalIncome = 0;

  for (const tx of transactions) {
    const { type, category, value } = tx;

    if (type === 'expense') {
      if (!categorySummary[category?.name]) {
        categorySummary[category?.name] = { expense: 0 };
      }
      categorySummary[category?.name].expense += value;
      totalExpense += value;
    } else if (type === 'income') {
      totalIncome += value;
    }
  }

  const total = Number(totalIncome - totalExpense);

  // if (totalIncome < totalExpense) {
  //   throw new Error('there are not enough funds on your balance');
  // }

  return {
    period,
    expense: totalExpense,
    income: totalIncome,
    total,
    categories: categorySummary,
  };
};

// get Transactions

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
      .populate({
        path: 'category',
        select: 'name -_id',
      })
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
