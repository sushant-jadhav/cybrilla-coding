module.exports = (sequelize, Sequelize) => {
    const Roles = sequelize.define("roles", {
      role_name: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
    });
  
    return Roles;
  };