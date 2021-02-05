'use strict';
let moment = require('moment');
let now = moment();
var bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    await queryInterface.bulkDelete("users", null, {
      truncate: true,
      cascade: true,
    });
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        full_name: 'Super Admin',
        email: 'superadmin@gmail.com',
        mobile: null,
        password: bcrypt.hashSync('Qwerty@1234', 8),
        role_id: 1,
        is_active: 1,
        created_at: now.format('YYYY-MM-DD hh:mm:ss'),
        updated_at: now.format('YYYY-MM-DD hh:mm:ss'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
