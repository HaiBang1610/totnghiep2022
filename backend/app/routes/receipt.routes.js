module.exports = app => {
    const receipts = require("../controllers/receipt.controller.js");
  
    var router = require("express").Router();
  
    // Create a new receipt
    router.post("/", receipts.create);
  
    // Retrieve all receipts
    router.get("/", receipts.findAll);
  
    // Retrieve a single receipt with id
    router.get("/:id", receipts.findOne);
  
    app.use('/api/receipts', router);
  };