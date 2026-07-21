const express = require("express");
const router = express.Router();
const bookModel = require("../models/book.model");

//Express Validator for input validation
const { body, validationResult } = require("express-validator");

// Post routes
router.post(
  "/",
  // Validation rules Middleware
  [
    body("bookName")
      .notEmpty()
      .withMessage("Book name is required")
      .isLength({ min: 5, max: 50 })
      .withMessage("Length should be between 5 and 50 characters"),
    body("countInStock")
      .notEmpty()
      .withMessage("Book stock count is required")
      .isInt({ min: 5, max: 50 })
      .withMessage("Stock count should be between 5 and 50"),
    body("price")
      .notEmpty()
      .withMessage("Book price is required")
      .isFloat({ min: 1, max: 10000 })
      .withMessage("Price should be between $1 and $10000"),
    body("imageUrl").optional().isURL().withMessage("Invalid image URL"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
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
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete book by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await bookModel.findByIdAndDelete(id);
    if (deletedBook) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update book by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await bookModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedBook) {
      res
        .status(200)
        .json({ message: "Book updated successfully", book: updatedBook });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
