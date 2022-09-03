const mongoose = require("../db/db");
var Float = require("mongoose-float").loadType(mongoose);

const ProductSchema = new mongoose.Schema({
  produto: {
    type: String,
    require: true,
  },

  valor: {
    type: Float,
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
