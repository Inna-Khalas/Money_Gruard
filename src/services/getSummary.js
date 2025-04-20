import { CATEGORIES } from '../constants/index.js';
import { Transaction } from '../db/models/transactions.js';

export const getSummary = async (owner, period) => {
  const [year, month] = period.split('-').map(Number);
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const transactions = await Transaction.find({
    owner,
    date: { $gte: startDate, $lt: endDate },
  });

  const categorySummary = {};
  let totalExpense = 0;
  let totalIncome = 0;

  for (const category of CATEGORIES) {
    categorySummary[category] = { expense: 0, income: 0 };
  }

  for (const tx of transactions) {
    const { type, category, value } = tx;

    if (type === 'expense') {
      totalExpense += value;
      if (categorySummary[category]) {
        categorySummary[category].expense += value;
      }
    } else if (type === 'income') {
      totalIncome += value;
      if (categorySummary[category]) {
        categorySummary[category].income += value;
      }
    }
  }

  return {
    period,
    total: {
      expense: totalExpense,
      income: totalIncome,
    },
    categories: categorySummary,
  };
};
