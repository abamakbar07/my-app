'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Books", [
      {
        title: "Sebuah Seni Untuk Bersikap Bodo Amat",
        publicationDate: "April 2018",
        pages: 365,
        isbn: 2147483647,
        author: "Mark Manson",
        price: 59000,
        about:
          "Selama beberapa tahun belakangan, Mark Manson—melalui blognya yang sangat populer tel ...",
        bookFile:
          "https://res.cloudinary.com/anggafile/image/upload/v1614961249/pdf/buku_k9hnx5.pdf",
        bookThumbnail:
          "https://res.cloudinary.com/anggafile/image/upload/v1614961377/images/200__dbimqy.jpg",
        createdAt: "2017-01-01",
        updatedAt: "2019-01-11",
      },
      {
        title: "My Own Private Mr. Cool",
        publicationDate: "Agustus 2018",
        pages: 264,
        isbn: 2147483647,
        author: "Indah Hanaco",
        price: 75000,
        about:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi excepturi dolore, quo adipisci, itaque fuga molestias porro impedit fugit neque voluptates saepe omnis corporis perspiciatis sed doloremque expedita illo incidunt?",
        bookFile:
          "https://res.cloudinary.com/anggafile/image/upload/v1614961249/pdf/buku_k9hnx5.pdf",
        bookThumbnail:
          "https://res.cloudinary.com/anggafile/image/upload/v1614961378/images/3_u5nqrn.png",
        createdAt: "2017-01-01",
        updatedAt: "2019-01-11",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};