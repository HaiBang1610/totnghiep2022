module.exports = app => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new product
  router.post("/", products.create);

  // Retrieve all products
  router.get("/", products.findAll);

  // Retrieve all categories
  router.get("/category", products.findCategory);

  // Retrieve all outstock products
  router.get("/outstock", products.findAllOutStock);

  // Retrieve all stock products
  router.get("/stock", products.findAllStock);

  // Retrieve a single product with id
  router.get("/:id", products.findOne);

  // Retrieve a single product with name
  router.get("/name/:name", products.findName);

  // Update a product with id
  router.put("/:id", products.update);

  // Delete a product with id
  router.delete("/:id", products.delete);

  // Delete all products
  router.delete("/", products.deleteAll);

  app.use('/api/products', router);
};