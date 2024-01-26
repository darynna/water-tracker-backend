const Water = require("../models/water");

const addWaterService = async (body) => {
  const newWaterNote = await Water.create(body);
  return newWaterNote;
};
const updateWaterService = async (id, owner, body) => {
  const updatedNote = await Water.findOneAndUpdate({ _id: id, owner }, body, {
    new: true,
  });
  return updatedNote;
};
const deleteWaterService = async (id, owner) => {
  const delatedWater = await Water.findOneAndDelete({ _id: id, owner });
  return delatedWater;
};

module.exports = {
  addWaterService,
  updateWaterService,
  deleteWaterService,
};
