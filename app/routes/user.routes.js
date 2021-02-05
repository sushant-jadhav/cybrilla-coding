module.exports = app => {
    const users = require("../controller/user.controller");

    const jwtMiddleware = require("../middleware/jwt.middleware");
    
    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", users.create);

    // Create a new Tutorial
    router.post("/register", users.registerUser);

    // Create a new Tutorial
    router.post("/login", users.login);

    // Retrieve all users
    router.get("/", users.findAll);

    // Retrieve all published users
    router.get("/published", jwtMiddleware.authenticateJWT, users.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", users.findOne);

    // Update a Tutorial with id
    router.put("/:id", users.update);

    // Delete a Tutorial with id
    router.delete("/:id", users.delete);

    // Delete all users
    router.delete("/", users.deleteAll);

    app.use('/api/user', router);
};
