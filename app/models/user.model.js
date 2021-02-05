module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('users', {
      full_name: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.STRING,
        validate:{
          notEmpty:{
            args:true,
            msg:"Email-id required"
          },
          isEmail:{
            args:true,
            msg:'Valid email-id required'
          }
        },
        unique: {
          args:true,
          msg: 'Email address already in use!'
        }
      },
      mobile: {
        type: Sequelize.BIGINT,
        allowNull:1
      },
      password: {
        type: Sequelize.STRING
      },
      role_id:{
        type:Sequelize.BIGINT,
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
    });

    return Users;
  };
