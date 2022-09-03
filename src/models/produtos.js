const mongoose = require("../db/db");

const ProductSchema = new mongoose.Schema({
  produto: {
    type: String,
    require: true,
  },

  valor: {
    type: Number,
    require: true,
  },

  descricao: {
    type: String,
    require: true,
  },

  created: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },

  updated: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
