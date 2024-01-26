const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../../utilities");

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
WaterSchema.post("save", handleMongooseError);

const Water = model("water", WaterSchema);

module.exports = Water;
