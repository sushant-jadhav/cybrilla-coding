module.exports = app => {
    const orders = require("../controller/order.controller");
    
    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", orders.create);

    // Retrieve all orders
    router.get("/", orders.findAll);

    // Retrieve all published orders
    router.get("/published", orders.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", orders.findOne);

    // Update a Tutorial with id
    router.put("/:id", orders.update);

    // Delete a Tutorial with id
    router.delete("/:id", orders.delete);

    // Delete all orders
    router.delete("/", orders.deleteAll);

    app.use('/api/order', router);
};