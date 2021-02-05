module.exports = (sequelize, Sequelize) => {
    const OrderStatus = sequelize.define("order_statuses", {
      status_name: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
    });
  
    return OrderStatus;
  };