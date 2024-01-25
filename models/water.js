const { Schema, model } = require("mongoose");

const WaterSchema = new Schema(
  {
    waterAmount: {
      type: Number,
      required: [true, "WaterAmount is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Water = model("water", WaterSchema);

module.exports = Water;
