const {
  addWaterService,
  updateWaterService,
  deleteWaterService,
  findUserWater,
} = require("../db/services/waterServices");
const {
  catchAsync,
  httpError,
  formatDate,
  formatDay,
} = require("../utilities");

const addWater = async (req, res) => {
  const { _id: owner } = req.user;
  const { waterAmount } = req.body;
  if (waterAmount > 5000) {
    res.status(400).json({ message: "waterAmount cannot exceed 5000" });
  }
  const newWaterNote = await addWaterService({ ...req.body, owner });
  res.status(201).json(newWaterNote);
};

const updateWater = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const { waterAmount } = req.body;
  if (waterAmount > 5000) {
    res.status(400).json({ message: "waterAmount cannot exceed 5000" });
  }

  const updatedWaterById = await updateWaterService(id, owner, req.body);
  if (!updatedWaterById) {
    throw httpError(404, "Not Found");
  }
  res.status(200).json(updatedWaterById);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const deletedWater = await deleteWaterService(id, owner);
  if (!deletedWater) {
    throw httpError(404, "Not found");
  }
  res.status(200).json({ massage: "Water deleted" });
};
// !~~consuption Water For Month and day;
const consuptionWaterForMonth = async (req, res) => {
  const { userDate } = req.params;
  const day = formatDay(userDate);

  const { _id: owner, dailyNorma } = req.user;
  const userWater = await findUserWater(owner);

  if (!userWater) {
    throw httpError(404, "Not found");
  }

  const userWaterForDay = userWater.filter((water) => {
    const dateString = water.date;
    const currentDay = formatDay(dateString);
    return currentDay === day;
  });

  const arryAmountForDay = userWaterForDay.map((water) => {
    return water.waterAmount;
  });

  const sum = arryAmountForDay.reduce(function (acc, currentValue) {
    return acc + currentValue;
  }, 0);

  const percentConsuption = Math.round((sum * 100) / (dailyNorma * 1000));
  const date = formatDate(userWaterForDay[0].date);
  const timesConsuption = userWaterForDay.length;

  res.status(200).json({
    userWaterForDay,
    date,
    percentConsuption,
    timesConsuption,
    dailyNorma,
  });
};

module.exports = {
  addWater: catchAsync(addWater),
  updateWater: catchAsync(updateWater),
  deleteById: catchAsync(deleteById),
  consuptionWaterForMonth: catchAsync(consuptionWaterForMonth),
};
