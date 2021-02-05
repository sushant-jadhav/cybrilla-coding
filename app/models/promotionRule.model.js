module.exports = (sequelize, Sequelize) => {
    const PromotionRules = sequelize.define("promotion_rules", {
        rule_name: {
            type: Sequelize.STRING
        },
        product_id:{
            type: Sequelize.BIGINT
        },
        quantity:{
            type: Sequelize.INTEGER
        },
        discount_price:{
            type: Sequelize.DECIMAL
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue:true
        },
    });

    return PromotionRules;
  };
