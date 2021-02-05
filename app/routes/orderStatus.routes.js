module.exports = app => {
    const orderStatus = require("../controller/orderStatus.controller");
    
    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", orderStatus.create);

    // Retrieve all orderStatus
    router.get("/", orderStatus.findAll);

    // Retrieve all published orderStatus
    router.get("/published", orderStatus.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", orderStatus.findOne);

    // Update a Tutorial with id
    router.put("/:id", orderStatus.update);

    // Delete a Tutorial with id
    router.delete("/:id", orderStatus.delete);

    // Delete all orderStatus
    router.delete("/", orderStatus.deleteAll);

    app.use('/api/order-status', router);
};