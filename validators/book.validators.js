//Express Validator for input validation
const { body, validationResult, param } = require("express-validator");

const createBookValidationRules = [
  body("bookName")
    .notEmpty()
    .withMessage((value, { req }) => req.t("bookNameRequired"))
    .isLength({ min: 5, max: 50 })
    .withMessage((value, { req }) => req.t("bookLengthInvalid")),
  body("countInStock")
    .notEmpty()
    .withMessage((value, { req }) => req.t("bookStockRequired"))
    .isInt({ min: 5, max: 50 })
    .withMessage((value, { req }) => req.t("bookStockInvalid")),
  body("price")
    .notEmpty()
    .withMessage((value, { req }) => req.t("bookPriceRequired"))
    .isFloat({ min: 1, max: 10000 })
    .withMessage((value, { req }) => req.t("bookPriceInvalid")),
  body("imageUrl")
    .optional()
    .isURL()
    .withMessage((value, { req }) => req.t("bookImageUrlInvalid")),
];

const updateBookValidationRules = [
  body("bookName")
    .optional()
    .isLength({ min: 5, max: 50 })
    .withMessage((value, { req }) => req.t("bookLengthInvalid")),
  body("countInStock")
    .optional()
    .isInt({ min: 5, max: 50 })
    .withMessage((value, { req }) => req.t("bookStockInvalid")),
  body("price")
    .optional()
    .isFloat({ min: 1, max: 10000 })
    .withMessage((value, { req }) => req.t("bookPriceInvalid")),
  body("imageUrl")
    .optional()
    .isURL()
    .withMessage((value, { req }) => req.t("bookImageUrlInvalid")),
];

const isValidMongoId = [
  param("id")
    .isMongoId()
    .withMessage((value, { req }) => req.t("invalidBookId")),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  createBookValidationRules,
  updateBookValidationRules,
  isValidMongoId,
  handleValidationErrors,
};
