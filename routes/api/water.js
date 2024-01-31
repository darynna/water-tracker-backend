const express = require("express");
const {
  authantication,
  validateBody,
  isValidId,
  validateQuery,
} = require("../../middleware");
const {
  bodyValidation,
  todayDatevalidation,
  validateInput,
} = require("../../utilities");

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
  "/update/:id",
  authantication,
  isValidId,
  validateBody(bodyValidation),
  updateWater
);

// !видалити нотатку
router.delete("/:id", authantication, isValidId, deleteById);

// *ендпоінт для взяття води за поточний день
router.get(
  "/today",
  authantication,
  validateQuery(todayDatevalidation),
  getSummary
);
// *ендпоінт для взяття води за поточний місяць
router.get(
  "/month",
  authantication,
  validateQuery(validateInput),
  getSummaryMonth
);

module.exports = router;
