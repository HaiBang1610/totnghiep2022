const Product = require("../models/product.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
	if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
};

const product = new Product({
    name: req.body.name,
    description: req.body.description,
    outstock: req.body.outstock || false,
    image: req.body.image,
    category: req.body.category,
    amount: req.body.amount,
    price: req.body.price,
    supplier_id: req.body.supplier_id,
  });

Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    else res.send(data);
  });
};

// Retrieve all Product from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  const category = req.query.category;
  const supplier_id = req.query.supplier_id;

  Product.getAll(name, category, supplier_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    else res.send(data);
  });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Find a single Product with a name
exports.findName = (req, res) => {
  //const name = req.query.name;
  Product.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with name ${req.params.name}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with name " + req.params.name
        });
      }
    } else res.send(data);
  });
};

// Find all categories
exports.findCategory = (req, res) => {
  Product.findCategory((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found any categories`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving categories"
        });
      }
    } else res.send(data);
  });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Product.updateById(
    req.params.id,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found product with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Product with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  Product.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with id " + req.params.id
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};

// Delete all Product from the database.
exports.deleteAll = (req, res) => {
  Product.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};

// Find all out of stock Product
exports.findAllOutStock = (req, res) => {
  Product.getAllOutStock((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    else res.send(data);
  });
};

// Find all stocked Product
exports.findAllStock = (req, res) => {
  Product.getAllStock((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    else res.send(data);
  });
};