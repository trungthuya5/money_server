module.exports = app => {
    const tranController = require('../applications/transaction/index').Controller

    // Create a new Transaction
    app.post("/transaction/create", tranController.add);
  
    // Retrieve all Transaction
    app.get("/transaction/list", tranController.findAll);
  
    // Retrieve a single Transaction with tranId
    app.get("/transaction/detail/:id", tranController.findOne);
  
    // Update a Transaction with tranId
    app.post("/transaction/update/:id", tranController.update);
  
    // Delete a Transaction with tranId
    app.get("/transaction/delete/:id", tranController.delete);
  
    // Create a new Transaction
    app.get("/transaction/delete", tranController.deleteAll);
}