'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      // {
      //   // id: 1,
      //   fullname: "Muhamad Akbar Afriansyah",
      //   email: "akbar@gmail.com",
      //   password:
      //     "$2b$10$ZA.oUUOq3tGG7IMqDfzVKukFRTtlItlcEAdJnyV.JxwONIzy0VpZS",
      //   isAdmin: true,
      //   gender: "Male",
      //   phone: "089692430573",
      //   address: "Kp. Cibugis RT.003/05 Des. Klapanunggal Kec. Klapanunggal",
      //   profilImage: null,
      //   createdAt: "2017-01-01",
      //   updatedAt: "2019-01-11",
      // },
      {
        id: 6,
        fullname: "Abyan",
        email: "abyan@gmail.com",
        password:
          "$2b$10$IrpteRoMl7PKbUwg.UbsDOYv13lKBVf/MWiXSIUZqoVh4S.aBNMpe",
        isAdmin: false,
        gender: "Male",
        phone: "089692430573",
        address: "Kp. Cibugis RT.003/05 Des. Klapanunggal Kec. Klapanunggal",
        profilImage: null,
        createdAt: "2017-01-01",
        updatedAt: "2019-01-11",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete("Users", null, {});
  },
};
