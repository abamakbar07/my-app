'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        fullname: "Muhamad Akbar Afriansyah",
        email: "akbar@gmail.com",
        password:
          "$2b$10$ZA.oUUOq3tGG7IMqDfzVKukFRTtlItlcEAdJnyV.JxwONIzy0VpZS",
        isAdmin: true,
        gender: "Male",
        phone: "089692430573",
        address: "Kp. Cibugis RT.003/05 Des. Klapanunggal Kec. Klapanunggal",
        profilImage:
          "https://res.cloudinary.com/anggafile/image/upload/v1614783546/images/profile_bo2dta.png",
        createdAt: "2017-01-01",
        updatedAt: "2019-01-11",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
