'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Bookpurchaseds", [
      // {
      //   id: 6,
      //   idTransaction: 4,
      //   idBook: 3,
      //   createdAt: "2017-01-01",
      //   updatedAt: "2019-01-11",
      // },
      // {
      //   id: 8,
      //   idTransaction: 5,
      //   idBook: 2,
      //   createdAt: "2017-01-01",
      //   updatedAt: "2019-01-11",
      // },
      // {
      //   id: 9,
      //   idTransaction: 5,
      //   idBook: 1,
      //   createdAt: "2017-01-01",
      //   updatedAt: "2019-01-11",
      // },
      // {
      //   id: 10,
      //   idTransaction: 5,
      //   idBook: 3,
      //   createdAt: "2017-01-01",
      //   updatedAt: "2019-01-11",
      // },
      // {
      //   id: 11,
      //   idTransaction: 6,
      //   idBook: 2,
      //   createdAt: "2017-01-01",
      //   updatedAt: "2019-01-11",
      // },
      // {
      //   id: 12,
      //   idTransaction: 7,
      //   idBook: 4,
      //   createdAt: "2017-01-01",
      //   updatedAt: "2019-01-11",
      // },
      // {
      //   id: 13,
      //   idTransaction: 8,
      //   idBook: 5,
      //   createdAt: "2017-01-01",
      //   updatedAt: "2019-01-11",
      // },
      // {
      //   id: 14,
      //   idTransaction: 8,
      //   idBook: 1,
      //   createdAt: "2017-01-01",
      //   updatedAt: "2019-01-11",
      // },
      {
        id: 15,
        idTransaction: 9,
        idBook: 1,
        createdAt: "2017-01-01",
        updatedAt: "2019-01-11",
      },
      {
        id: 16,
        idTransaction: 9,
        idBook: 3,
        createdAt: "2017-01-01",
        updatedAt: "2019-01-11",
      },
      {
        id: 17,
        idTransaction: 9,
        idBook: 6,
        createdAt: "2017-01-01",
        updatedAt: "2019-01-11",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
