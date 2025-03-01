const validation = (Schema) => async (req, res, next) => {
  try {
    const parseBody = await Schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    const message = error.errors[0].message;

    const status = 500;
    const err = {
      message,
      status,
    };
    next(err);
  }
};
module.exports = validation;
