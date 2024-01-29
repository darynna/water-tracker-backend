const express = require("express");
const { authantication, validateBody, isValidId } = require("../../middleware");
const { bodyValidation } = require("../../utilities");

const { addWater, updateWater, deleteById, getSummary } = require("../../controllers");
const {
  consumptionWaterForMonth,
} = require("../../controllers/waterControllers");

const router = express.Router();

// *додати запису про вживану воду
router.post("/", authantication, validateBody(bodyValidation), addWater);

// ?редагувати існуючу нотатку про воду
router.put(
  "/:id",
  authantication,
  isValidId,
  validateBody(bodyValidation),
  updateWater
);

// !видалити нотатку
router.delete("/:id", authantication, isValidId, deleteById);

// *ендпоінт для взяття води за поточний день
router.get("/today", authantication, getSummary);
router.get("/consumption/:userDate", authantication, consumptionWaterForMonth);

module.exports = router;
