const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, },
    image: { type: String, required: true },
    category: { type: String },
    rating: { type: Array },
    price: { type: Number, required: true }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);