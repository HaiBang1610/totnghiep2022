module.exports = app => {
    const suppliers = require("../controllers/supplier.controller.js");
  
    var router = require("express").Router();
  
    // Create a new supplier
    router.post("/", suppliers.create);
  
    // Retrieve all suppliers
    router.get("/", suppliers.findAll);
  
    // Retrieve a single supplier with id
    router.get("/:id", suppliers.findOne);

    // Retrieve a single supplier with name
    router.get("/name/:name", suppliers.findName);
  
    // Update a supplier with id
    router.put("/:id", suppliers.update);
  
    // Delete a supplier with id
    router.delete("/:id", suppliers.delete);
  
    // Delete all suppliers
    router.delete("/", suppliers.deleteAll);
  
    app.use('/api/suppliers', router);
  };