const {
  addWaterService,
  updateWaterService,
  deleteWaterService,
} = require("../db/services/waterServices");
const { catchAsync, httpError } = require("../utilities");

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

module.exports = {
  addWater: catchAsync(addWater),
  updateWater: catchAsync(updateWater),
  deleteById: catchAsync(deleteById),
};
