module.exports = app => {
    const carts = require("../controller/cart.controller");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", carts.create);

    // Retrieve all carts
    router.get("/", carts.findAll);

    // Retrieve all published carts
    router.get("/product", carts.findAllCartProducts);

    // Retrieve a single Tutorial with id
    router.get("/:id", carts.findOne);

    // Update a Tutorial with id
    router.put("/:id", carts.update);

    // Delete a Tutorial with id
    router.delete("/:id", carts.delete);

    // Delete all carts
    router.delete("/", carts.deleteAll);

    app.use('/api/cart', router);
};
