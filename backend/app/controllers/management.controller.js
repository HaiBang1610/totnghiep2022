const Management = require("../models/management.model.js");

// Create and Save a new Management
exports.create = (req, res) => {
	if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
};

const management = new Management({
  product_name: req.body.product_name,
  sell_amount: req.body.sell_amount,
  total_price: req.body.total_price,
  datetime: req.body.datetime,
  });

Management.create(management, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Management."
      });
    else res.send(data);
  });
};

// Retrieve all Management from the database.
exports.findAll = (req, res) => {
    const product_name = req.query.product_name;
    const datetime= req.query.datetime;
  
    Management.getAll(product_name, datetime, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving managements."
        });
      else res.send(data);
    });
};

// Find a single Management with an id
exports.findOne = (req, res) => {
    Management.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Management with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Management with id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

// get total price
exports.getTotalPrice = (req, res) => {
  const datetime= req.params.datetime;
  console.log(datetime);
  Management.getTotalPrice(datetime, (err, data) => {
    if (err) {
      if (err.kind === "not_get") {
        res.status(404).send({
          message: `Not get total price with datetime ${datetime}.`
        });
      } else {
        res.status(500).send({
          message: "Error getting total price with datetime " + datetime
        });
      }
    } else res.send(data);
  });
};

// Delete a Management with the specified id in the request
exports.delete = (req, res) => {
    Management.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found management with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete management with id " + req.params.id
          });
        }
      } else res.send({ message: `Management was deleted successfully!` });
    });
  };