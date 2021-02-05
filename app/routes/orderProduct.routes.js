module.exports = app => {
    const sizes = require("../controller/orderProduct.controller");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", sizes.create);

    // Retrieve all sizes
    router.get("/", sizes.findAll);

    // Retrieve all published sizes
    router.get("/published", sizes.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", sizes.findOne);

    // Update a Tutorial with id
    router.put("/:id", sizes.update);

    // Delete a Tutorial with id
    router.delete("/:id", sizes.delete);

    // Delete all sizes
    router.delete("/", sizes.deleteAll);

    app.use('/api/size', router);
};
