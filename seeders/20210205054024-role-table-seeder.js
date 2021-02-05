'use strict';
let moment = require('moment');
let now = moment();

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
    await queryInterface.bulkDelete("roles", null, {
      truncate: true,
      cascade: true,
    });

    return queryInterface.bulkInsert('roles', [
      {
        id: 1,
        role_name: 'Super Admin',
        is_active: 1,
        created_at: now.format('YYYY-MM-DD hh:mm:ss'),
        updated_at: now.format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        id: 2,
        role_name: 'Customer',
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
