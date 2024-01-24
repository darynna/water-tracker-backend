const catchAsync = (data) => {
    const func = async (req, res, next) => {
      try {
        await data(req, res, next);
      } catch (error) {
        next(error);
      }
    };
    return func;
  };

 module.exports = catchAsync;  