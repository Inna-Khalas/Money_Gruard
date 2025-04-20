import { getSummary } from '../../services/getSummary.js';

export const getSummaryController = async (req, res) => {
  const { period } = req.query;
  const { _id: owner } = req.user;

  if (!period || !/^\d{4}-\d{2}$/.test(period)) {
    return res
      .status(400)
      .json({ message: 'Invalid or missing period format (YYYY-MM)' });
  }

  const result = await getSummary(owner, period);
  res.json(result);
};
