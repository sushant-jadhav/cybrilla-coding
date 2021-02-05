const express = require("express");
const bodyParser = require("body-parser");
const jwtMiddleware = require("./app/middleware/jwt.middleware");
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

require("./app/routes/role.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/userrole.routes")(app);
// require("./app/routes/order.routes")(app);
// require("./app/routes/orderStatus.routes")(app);
require("./app/routes/cart.routes")(app);
// require("./app/routes/orderProduct.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/orderStatus.routes")(app);
require("./app/routes/promotionRule.routes")(app);

// app.use(jwtMiddleware.authenticateJWT);

app.use(function (req,res,next){
	res.status(404).send({error:'Unable to find the requested resource!'});
});

// set port, listen for requests
// app.listen(3000, () => {
//   console.log("Server is running on port 3000.");
// });

module.exports = app;

