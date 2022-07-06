module.exports = app => {
    const managements = require("../controllers/management.controller.js");
  
    var router = require("express").Router();
  
    // Create a new management
    router.post("/", managements.create);
  
    // Retrieve all managements
    router.get("/", managements.findAll);
  
    // Retrieve a single management with id
    router.get("/:id", managements.findOne);

    // Get total price with datetime
    router.get("/datetime/:datetime", managements.getTotalPrice);
  
    // Delete a management with id
    router.delete("/:id", managements.delete);
  
  
    app.use('/api/managements', router);
  };