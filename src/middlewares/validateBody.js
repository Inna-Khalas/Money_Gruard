export const validateBody = (schema) => {
  return (req, _res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      return next(error);
    }
    next();
  };
};
