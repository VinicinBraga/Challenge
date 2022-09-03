const { response } = require("express");
const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");

const PORT = process.env.PORT;

const Product = require("./models/produtos");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/produtos", async (req, res) => {
  try {
    const products = await Product.find();
    res.send({ products });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/produtos/:find", async (req, res) => {
  const find = req.params.find;

  let data = await Product.find({
    $or: [{ produto: { $regex: find } }, { descricao: { $regex: find } }],
  });
  res.send(data);
});

app.get("/produtos/:id", async (req, res) => {
  try {
    const productById = req.params.id;
    const products = await Product.findById(productById);
    res.send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/produtos", async (req, res) => {
  try {
    const { produto, valor, descricao } = req.body;
    const product = await Product.create({ produto, valor, descricao });
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put("/produtos/:id", async (req, res) => {
  try {
    const productById = req.params.id;
    const { produto, valor, descricao } = req.body;
    const product = await Product.findByIdAndUpdate(
      productById,
      {
        produto,
        valor,
        descricao,
      },
      { new: true }
    );
    res.send({ product });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/produtos/:id", async (req, res) => {
  try {
    const productById = req.params.id;
    const { produto, valor, descricao } = req.body;
    const product = await Product.updateOne(
      productById,
      {
        produto,
        valor,
        descricao,
      },
      { new: true }
    );
    res.send({ product });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const productById = req.params.id;
    await Product.findByIdAndDelete(productById);
    res.send({ msg: "Deletado com sucesso" });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
