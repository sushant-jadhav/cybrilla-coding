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
  },
  logging: false
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
// db.carts.hasOne(db.products,{foreignKey: 'id'});
// db.products.belongsTo(db.carts,{foreignKey: 'id'});

Object.keys(db).forEach(key => {
  console.log('key',db[key].associate);
  if (db[key] && db[key].associate) {
    db[key].associate(db);
  }
});

// sequelize.sync({ force: true });

module.exports = db;
