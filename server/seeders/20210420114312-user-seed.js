'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: '5be06dfb-30fd-4352-88c0-11e5f7414acf',
        firstName: "Emmanuel",
        lastName: "Okoye",
        password: "1234567",
        email: "okoyeemma442@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '32d346ea-8e0b-4c1c-8082-c6ec06594190',
        firstName: "Chuks",
        lastName: "Okoye",
        password: "1234567",
        email: "chukseemma442@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'a5e2372b-6e22-4abd-9a0d-4ca7595cd9b1',
        firstName: "Tenece",
        lastName: "Okoye",
        password: "1234567",
        email: "Teneceeemma442@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b5818d3d-2d64-4b5e-b74e-1c09b12de401',
        firstName: "Great",
        lastName: "Okoye",
        password: "1234567",
        email: "greatemma442@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
