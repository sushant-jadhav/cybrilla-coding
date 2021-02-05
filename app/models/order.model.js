module.exports = (sequelize, Sequelize) => {
    const Orders = sequelize.define("orders", {
      user_id:{
        type:Sequelize.BIGINT,
      },
      total_amount: {
        type: Sequelize.STRING
      },
      tax_amount: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      order_status_id:{
        type:Sequelize.BOOLEAN,
      },
      delivery_address: {
        type: Sequelize.TEXT,
        allowNull:1
      },
      is_canceled: {
        type: Sequelize.BOOLEAN
      },
      is_amount_paid: {
        type: Sequelize.BOOLEAN
      },
    });

    return Orders;
  };
