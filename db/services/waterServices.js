const Water = require("../models/water");
const { User } = require("../models/users");
const { httpError } = require("../../utilities");

const addWaterService = async (body) => {
  const { date } = body;
  const timeComponents = date.split(":");
  const hours = Number(timeComponents[0]);
  const minutes = Number(timeComponents[1]);

  // Get the current date
  const currentDate = new Date();

  // Set the hours and minutes
  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);

  const newWaterNote = await Water.create({ ...body, date: currentDate });
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
const findUserWater = async (owner) => {
  const userWater = await Water.find({ owner });
  return userWater;
};

const getWaterConsumptionDaySummary = async (owner, date) => {
  const user = await User.findById(owner);
  if (!user) throw httpError(404, "User not found");
  const dailyNormAmount = user.dailyNorm;
  let waterConsumptionArray = await Water.aggregate([
    {
      $match: {
        $and: [
          { owner: owner },
          {
            date: {
              $gte: new Date(date),
              $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: null,
        waterVolumeSum: { $sum: "$waterAmount"},
        waterVolumes: { $push: "$$ROOT" },
      },
    },
    {
      $addFields: {
        waterVolumePercentage: {
          $multiply: [{ $divide: ["$waterVolumeSum", dailyNormAmount] }, 100] 
        }
      },
    },
    {
      $project: {
        _id: 0,
      },
    }
  ]);
  if (waterConsumptionArray.length === 0) {
    waterConsumptionArray = [
      {
        waterVolumeSum: 0,
        waterVolumes: [],
        waterVolumePercentage: 0,
      },
    ];
  };

  console.log(waterConsumptionArray)

  return waterConsumptionArray
};

module.exports = {
  addWaterService,
  updateWaterService,
  deleteWaterService,
  findUserWater,
  getWaterConsumptionDaySummary,
};
