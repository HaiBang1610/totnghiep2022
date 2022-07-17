const Receipt = require("../models/receipt.model.js");

// Create and Save a new Receipt
exports.create = (req, res) => {
	if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
};

const receipt = new Receipt({
    customer_name: req.body.customer_name,
    sale_managements: req.body.sale_managements,
    price: req.body.price,
    createdTime: req.body.createdTime,
  });

  Receipt.create(receipt, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Receipt."
      });
    else res.send(data);
  });
};

// Retrieve all Receipt from the database.
exports.findAll = (req, res) => {
  const customer_name = req.query.customer_name;
  const createdTime = req.query.createdTime

  Receipt.getAll(customer_name, createdTime, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Receipts."
      });
    else res.send(data);
  });
};

// Find a single Receipt with an id
exports.findOne = (req, res) => {
    Receipt.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Receipt with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Receipt with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};