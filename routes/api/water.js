const express = require("express");
const { authantication, validateBody, isValidId } = require("../../middleware");
const { bodyValidation } = require("../../utilities");

const {
  addWater,
  updateWater,
  deleteById,
  getSummary,
  getSummaryMonth,
} = require("../../controllers");

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
// *ендпоінт для взяття води за поточний місяць
router.get("/month", authantication, getSummaryMonth);

module.exports = router;
