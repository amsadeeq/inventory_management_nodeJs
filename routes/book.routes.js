const express = require("express");
const router = express.Router();
const bookModel = require("../models/book.model");
const { param } = require("express-validator");

const {
  createBookValidationRules,
  updateBookValidationRules,
  isValidMongoId,
  handleValidationErrors,
} = require("../validators/book.validators");

// Post routes
router.post(
  "/",
  // Validation rules Middleware that validate the request body
  createBookValidationRules,
  handleValidationErrors,

  async (req, res) => {
    try {
      const newBook = await bookModel.create(req.body);
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
);

// Get routes
router.get("/", async (req, res) => {
  try {
    const booksList = await bookModel.find();
    res.status(200).send(booksList);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get book by ID
router.get("/:id", isValidMongoId, handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: req.t("bookNotFound") });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete book by ID
router.delete(
  "/:id",
  isValidMongoId,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBook = await bookModel.findByIdAndDelete(id);
      if (deletedBook) {
        res.status(200).json({ message: req.t("bookDeleted") });
      } else {
        res.status(404).json({ message: req.t("bookNotFound") });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
);

// Update book by ID
router.put(
  "/:id",

  // Validation rules Middleware that validate the request body
  isValidMongoId,
  updateBookValidationRules,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBook = await bookModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (updatedBook) {
        res
          .status(200)
          .json({ message: req.t("bookUpdated"), book: updatedBook });
      } else {
        res.status(404).json({ message: req.t("bookNotFound") });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
);

module.exports = router;
