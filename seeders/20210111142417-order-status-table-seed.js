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

    await queryInterface.bulkDelete("order_statuses", null, {
      truncate: true,
      cascade: true,
    });

    return queryInterface.bulkInsert('order_statuses', [
      {
        id:1,
        status_name: 'Pending',
        is_active: 1,
        created_at:now.format('YYYY-MM-DD hh:mm:ss'),
        updated_at:now.format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        id:2,
        status_name: 'Client Confirmed',
        is_active: 1,
        created_at:now.format('YYYY-MM-DD hh:mm:ss'),
        updated_at:now.format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        id:3,
        status_name: 'Admin Confirmed',
        is_active: 1,
        created_at:now.format('YYYY-MM-DD hh:mm:ss'),
        updated_at:now.format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        id:4,
        status_name: 'Delivered',
        is_active: 1,
        created_at:now.format('YYYY-MM-DD hh:mm:ss'),
        updated_at:now.format('YYYY-MM-DD hh:mm:ss'),
      }
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
