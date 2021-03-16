'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Transactions", [
      // {
      //   id: 5,
      //   users: "20",
      //   transferProof: "1614513187540-transferProof.png",
      //   productPurchased: "2,1,3",
      //   paymentTotal: 183300,
      //   paymentStatus: "Cancel",
      //   createdAt: "2017-01-01",
      //   updatedAt: "2019-01-11",
      // },
      // {
      //   id: 6,
      //   users: "24",
      //   transferProof: "1614605296278-transferProof.png",
      //   productPurchased: "2",
      //   paymentTotal: 75000,
      //   paymentStatus: "Approve",
      //   createdAt: "2017-01-01",
      //   updatedAt: "2019-01-11",
      // },
      // {
      //   id: 7,
      //   users: "21",
      //   transferProof: "1614605296278-transferProof.png",
      //   productPurchased: "2,4",
      //   paymentTotal: 243000,
      //   paymentStatus: "Approve",
      //   createdAt: "2017-01-01",
      //   updatedAt: "2019-01-11",
      // },
      // {
      //   id: 8,
      //   users: "5",
      //   transferProof: "1614605296278-transferProof.png",
      //   productPurchased: "5,1",
      //   paymentTotal: 243000,
      //   paymentStatus: "Pending",
      //   createdAt: "2017-01-01",
      //   updatedAt: "2019-01-11",
      // },
      {
        id: 9,
        users: "6",
        transferProof: "1614605296278-transferProof.png",
        productPurchased: "1,3,6",
        paymentTotal: 238300,
        paymentStatus: "Pending",
        createdAt: "2017-01-01",
        updatedAt: "2019-01-11",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
