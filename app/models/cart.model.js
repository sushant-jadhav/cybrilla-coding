module.exports = (sequelize, Sequelize) => {
  const Carts = sequelize.define("carts", {
    user_id:{
      type:Sequelize.BIGINT,
      allowNull:1
    },
    product_id:{
      type:Sequelize.BIGINT,
    },
    amount:{
      type: Sequelize.DECIMAL
    },
    total_amount:{
      type: Sequelize.DECIMAL
    },
    tax_amount: {
      type: Sequelize.STRING,
      allowNull: 1
    },
    quantity: {
      type: Sequelize.STRING
    },
    discount_amount: {
      type: Sequelize.STRING
    },

  },{
    classMethods: {
      associate: function (models) {
        // Carts.hasOne(models.products,{foreignKey:'id'});
        // order.belongsToMany(models.products, { through: { model: models.orderProduct } });
        // order.hasMany(models.orderProduct);
      }
    }
  });

  return Carts;
};
