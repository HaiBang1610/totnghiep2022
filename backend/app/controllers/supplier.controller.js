const Supplier = require("../models/supplier.model.js");

// Create and Save a new Supplier
exports.create = (req, res) => {
	if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
};

const supplier = new Supplier({
  supplier_name: req.body.name,
  supplier_description: req.body.description,
  supplier_phone: req.body.phone,
  supplier_address: req.body.address,
  });

Supplier.create(supplier, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Supplier."
      });
    else res.send(data);
  });
};

// Retrieve all Supplier from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
  
    Supplier.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving suppliers."
        });
      else res.send(data);
    });
  };

// Find a single Supplier with an id
exports.findOne = (req, res) => {
    Supplier.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Supplier with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Supplier with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

// Find a single Supplier with a name
exports.findName = (req, res) => {
  //const name = req.query.name;
  Supplier.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Supplier with name ${req.params.name}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Supplier with name " + req.params.name
        });
      }
    } else res.send(data);
  });
};

// Update a Supplier by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Supplier.updateById(
      req.params.id,
      new Supplier(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found supplier with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating supplier with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Supplier with the specified id in the request
exports.delete = (req, res) => {
    Supplier.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found supplier with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete supplier with id " + req.params.id
          });
        }
      } else res.send({ message: `Supplier was deleted successfully!` });
    });
  };
  
// Delete all supplier from the database.
  exports.deleteAll = (req, res) => {
    Supplier.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all suppliers."
        });
      else res.send({ message: `All Suppliers were deleted successfully!` });
    });
  };