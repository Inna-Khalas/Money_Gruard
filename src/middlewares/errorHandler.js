import { HttpError } from 'http-errors';

export const errorHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    if (err.errors && Array.isArray(err.errors)) {
      const messages = err.errors.map((e) => e.message).join(', ');

      return res.status(err.status).json({
        status: err.status,
        message: 'Something went wrong',
        data: messages,
      });
    }

    return res.status(err.status).json({
      status: err.status,
      message: err.message || 'Something went wrong',
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
};
