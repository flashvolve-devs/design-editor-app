'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface.bulkInsert('users',
  [
    {
      id: 1,
      name: 'Developer',
      email:'dev@designeditorapp.com',
      password: 'b2650b556c852abfb12818b35e6e1ad3' // senha: md5('--flashvolve@2022!!--')
    }
  ], {}),

  down: (queryInterface, _Sequelize) => queryInterface.bulkDelete('users', null, {})
};
