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
  formatMonth,
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
  const { month, day } = req.params;
  const { _id: owner, dailyNorma } = req.user;

  const userWater = await findUserWater(owner);

  if (!userWater) {
    throw httpError(404, "Not found");
  }
  const userWaterForMonth = userWater.filter((water) => {
    const dateString = water.date;
    const currentMonth = parseInt(formatMonth(dateString));

    return currentMonth === parseInt(month);
  });

  const userWaterForDay = userWaterForMonth.filter((water) => {
    const dateString = water.date;
    const currentDay = parseInt(formatDay(dateString));

    return currentDay === parseInt(day);
  });

  const date = formatDate(userWaterForDay[0].date);
  const timesConsuption = userWaterForDay.length;

  res.status(200).json({
    userWaterForDay,
    date,
    dailyNorma,
    timesConsuption,
  });
};

module.exports = {
  addWater: catchAsync(addWater),
  updateWater: catchAsync(updateWater),
  deleteById: catchAsync(deleteById),
  consuptionWaterForMonth: catchAsync(consuptionWaterForMonth),
};
