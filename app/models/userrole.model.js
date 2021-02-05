module.exports = (sequelize, Sequelize) => {
    const Sizes = sequelize.define("user_roles", {
      user_id:{
        type:Sequelize.BIGINT,
      },
      role_id:{
        type:Sequelize.BIGINT,
      },
    });

    // Sizes.associate = function(models) {
    //     Sizes.belongsTo(models.types, {
    //         foreignKey: 'type_id',
    //         onDelete: 'CASCADE'
    //     });
    // };
  
    return Sizes;
  };