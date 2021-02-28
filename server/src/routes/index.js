const express = require("express");
const router = express.Router();

const { register, login, checkAuth } = require("../controllers/authControllers");
const { addBook, getBooks, getBookDetail } = require("../controllers/bookControllers");
const { getBookTransactions, addBookTransaction, getBookTransaction } = require("../controllers/bookTransactionControllers");
const { addTransaction, getTransactions, editTransaction, getTransaction } = require("../controllers/transactionControllers");
const { getUser, editUser, editUserNoImage } = require("../controllers/userControllers");
const { loginAuth } = require("../middlewares/auth");
const { uploadBookNew } = require("../middlewares/uploadBook");
const { uploadProfileImage } = require("../middlewares/uploadProfile");
const { uploadTransactionProof } = require("../middlewares/uploadTransaction");

router.post("/register", register)
router.post("/login", login)
router.get("/check-auth", loginAuth, checkAuth);

router.get("/user/:id", getUser)
router.post("/user/edit", uploadProfileImage("profilImage"), editUser)
router.post("/user/edit-noimage", editUserNoImage);

router.get("/books", getBooks)
router.get("/book/:id", getBookDetail)
router.post("/book", uploadBookNew("bookThumbnail", "bookFile"), addBook)

router.get("/transactions", getTransactions)
router.get("/transaction/:idUser", getTransaction)
router.patch("/transaction/:id", editTransaction);
router.post("/transaction", uploadTransactionProof("transferProof"), addTransaction)

router.get("/booktransactions", getBookTransactions);
router.get("/booktransaction/:idTransaction", getBookTransaction);
router.post("/booktransaction", addBookTransaction);

module.exports = router;