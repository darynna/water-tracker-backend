const {
  addWaterService,
  updateWaterService,
  deleteWaterService,
  getWaterConsumptionDaySummary,
  getWaterConsumptionMonthSummary,
} = require("../db/services/waterServices");
const { catchAsync, httpError } = require("../utilities");

const addWater = async (req, res) => {
  const { _id: owner } = req.user;

  const newWaterNote = await addWaterService({ ...req.body, owner });
  res.status(201).json(newWaterNote);
};

const updateWater = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

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

const getSummary = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;
  const waterConsumptionArray = await getWaterConsumptionDaySummary(
    owner,
    date
  );
  res.status(200).json(waterConsumptionArray[0]);
};
const getSummaryMonth = async (req, res) => {
  const { _id: owner } = req.user;
  const { year, month } = req.query;

  const waterConsumptionMonth = await getWaterConsumptionMonthSummary(
    owner,
    year,
    month
  );
  res.status(200).json(waterConsumptionMonth);
};

module.exports = {
  addWater: catchAsync(addWater),
  updateWater: catchAsync(updateWater),
  deleteById: catchAsync(deleteById),
  getSummary: catchAsync(getSummary),
  getSummaryMonth: catchAsync(getSummaryMonth),
};
