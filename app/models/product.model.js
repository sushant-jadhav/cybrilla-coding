module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("products", {
      title: {
        type: Sequelize.STRING,
        validate:{
          notEmpty:{
            args:true,
            msg:"Product Title required"
          },
        },
        unique: {
          args:true,
          msg: 'Product already present!'
        }
      },
      description: {
        type: Sequelize.STRING,
        allowNull:1
      },
      price:{
        type:Sequelize.DECIMAL
      },
      is_discount:{
        type: Sequelize.BOOLEAN
      },
      discount_percentage:{
        type:Sequelize.DECIMAL,
        allowNull:1
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
    },{
      classMethods: {
        associate: function (models) {
          // Products.belongsTo(models.carts);
          // order.belongsToMany(models.products, { through: { model: models.orderProduct } });
          // order.hasMany(models.orderProduct);
        }
      }
    });

    return Products;
  };
