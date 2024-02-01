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

router.post("/", authantication, validateBody(bodyValidation), addWater);

router.put(
  "/update/:id",
  authantication,
  isValidId,
  validateBody(bodyValidation),
  updateWater
);

router.delete("/:id", authantication, isValidId, deleteById);

router.get(
  "/today",
  authantication,
  validateQuery(todayDatevalidation),
  getSummary
);

router.get(
  "/month",
  authantication,
  validateQuery(validateInput),
  getSummaryMonth
);

module.exports = router;
