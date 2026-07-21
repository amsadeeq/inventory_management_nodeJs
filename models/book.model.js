const express = require("express");
const mongoose = require("mongoose");

// Mongoose Schema and Model
const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: [true, "Book name is required"],
    minLength: [5, "Length should be at least 5 characters"],
    maxLength: [50, "Length should not exceed 50 characters"],
  },
  countInStock: {
    type: Number,
    required: [true, "Book stock count is required"],
    min: [5, "Stock count should be at least 5"],
    max: [50, "Stock count should not exceed 50"],
  },
  price: {
    type: Number,
    required: [true, "Book price is required"],
    min: [1, "Price should be at least $1"],
    max: [10000, "Price should not exceed $10000"],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    default: "",
    validate: {
      validator: function (v) {
        if (!v) return true; // Allow empty string
        return /^https?:\/\/.+/.test(v);
      },
      message: "Invalid image URL",
    },
  },
});

bookSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
bookSchema.set("toJSON", {
  virtuals: true,
});

// Model
module.exports = mongoose.model("Book", bookSchema);
