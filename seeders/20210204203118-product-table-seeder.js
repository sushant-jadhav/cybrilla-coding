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
    await queryInterface.bulkDelete("products", null, {
      truncate: true,
      cascade: true,
    });
    return queryInterface.bulkInsert('products', [
      {
        id: 1,
        title: 'A',
        description: 'A Product',
        price: 30.00,
        // is_discount: 0,
        is_active: 1,
        created_at: now.format('YYYY-MM-DD hh:mm:ss'),
        updated_at: now.format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        id: 2,
        title: 'B',
        description: 'B Product',
        price: 20.00,
        // is_discount: 0,
        is_active: 1,
        created_at: now.format('YYYY-MM-DD hh:mm:ss'),
        updated_at: now.format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        id: 3,
        title: 'C',
        description: 'C Product',
        price: 50.00,
        // is_discount: 0,
        is_active: 1,
        created_at: now.format('YYYY-MM-DD hh:mm:ss'),
        updated_at: now.format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        id: 4,
        title: 'D',
        description: 'D Product',
        price: 15.00,
        is_discount: 0,
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
