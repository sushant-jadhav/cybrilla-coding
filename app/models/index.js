const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    underscored: true,
    underscoredAll: true,
    createdAt:'created_at',
    updatedAt:'updated_at',
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.carts         = require("./cart.model")(sequelize, Sequelize);
db.orderStatuss  = require("./orderStatus.model")(sequelize, Sequelize);
db.orderProducts = require("./orderProduct.model")(sequelize, Sequelize);
db.userroles     = require("./userrole.model")(sequelize, Sequelize);
db.users         = require("./user.model")(sequelize, Sequelize);
db.roles         = require("./role.model")(sequelize, Sequelize);
db.orders        = require("./order.model")(sequelize, Sequelize);
db.products        = require("./product.model")(sequelize, Sequelize);
db.promotionRules = require("./promotionRule.model")(sequelize, Sequelize);

//Relations
// db.products.hasOne(db.carts,{foreignKey: 'product_id'});
db.carts.hasOne(db.products,{foreignKey: 'id'});

module.exports = db;
