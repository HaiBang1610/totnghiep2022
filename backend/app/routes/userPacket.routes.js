module.exports = app => {
    const users = require("../controllers/userPacket.controller.js");
  
    var router = require("express").Router();
   
    // Retrieve all products
    router.get("/", users.findAll);

    // Retrieve a single product with id
    router.get("/:id", users.findOne);
  
    // Update a product with id
    router.put("/:id", users.update);

    // Update a product role with id
    router.put("/role/:id", users.updateRole);

    // Update a product password with id
    router.put("/pass/:id", users.updatePass);
  
    // Delete a product with id
    router.delete("/:id", users.delete);
  
    app.use('/api/usersPacket', router);
  };