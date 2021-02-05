module.exports = (sequelize, Sequelize) => {
    const OrderProduct = sequelize.define("order_products", {
      order_id: {
        type: Sequelize.BIGINT
      },
      type_id: {
        type: Sequelize.BIGINT
      },
      material_id: {
        type: Sequelize.BIGINT
      },
      size_id: {
        type: Sequelize.BIGINT
      },
      size_mm_id: {
        type: Sequelize.BIGINT
      },
      quantity_id: {
        type: Sequelize.BIGINT
      },
      price_id: {
        type: Sequelize.BIGINT
      },
      amount: {
        type: Sequelize.STRING
      },
      type_id:{
        type:Sequelize.BIGINT,
      },
      cornor_type:{
        type: Sequelize.BOOLEAN,
        allowNull:true
      },
      number_unique_design:{
        type: Sequelize.STRING,
        allowNull:true
      },
      quantity_type:{
        type:Sequelize.ENUM,
        values: ['month', 'quater','year']
      },
    });
  
    return OrderProduct;
  };