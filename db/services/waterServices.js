const Water = require("../models/water");

const addWaterService = async (body) => {
  const { date } = body;
  const timeComponents = date.split(':');
  const hours = Number(timeComponents[0]);
  const minutes = Number(timeComponents[1]);
      
  // Get the current date
  const currentDate = new Date();
        
  // Set the hours and minutes
  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);

  const newWaterNote = await Water.create({...body, date: currentDate});
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
