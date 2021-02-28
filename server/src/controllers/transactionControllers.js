const { Transactions, Users, Books } = require("../../models");

exports.addTransaction = async (req, res) => {
  const { body, files } = req;

  try {
    const transaction = await Transactions.create({
      ...body,
      transferProof: files.transferProof[0].filename,
      paymentStatus: "Pending",
    });

    const users = await Users.findOne({
      where: {
        id: body.users,
      },
      attributes: {
        exclude: ["email", "createdAt", "updatedAt", "password", "isAdmin", "phone", "address", "gender", "profilImage"],
      },
    });

    const transactionUpdated = await Transactions.findOne({
      where: {
        id: transaction.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    await (transactionUpdated["users"] = users);

    res.send({
      status: "success",
      data: {
        transaction: transactionUpdated,
      },
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transactions.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["userId", "UserId"],
      },
    });

    if (!transaction) {
      return res.send({
        message: `Transaction with id ${id} Not Existed`,
      });
    }

    await Transactions.update(req.body, {
      where: {
        id,
      },
    });

    const transactionUpdated = await Transactions.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "UserId"],
      },
    });

    const users = await Users.findOne({
      where: {
        id: transactionUpdated.users,
      },
      attributes: {
        exclude: ["email", "password", "createdAt", "updatedAt", "isAdmin"],
      },
    });

    await (transactionUpdated["users"] = users);

    res.send({
      status: "success",
      data: {
        transaction: transactionUpdated,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const { idUser } = req.params;

    console.log(idUser)

    const transaction = await Transactions.findOne({
      where: {
        users: idUser
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "UserId"],
      },
    });

    console.log(transaction)

    if (!transaction) {
      return res.status(400).send({
        message: `Transaction with userId ${idUser} Not Existed`,
      });
    }

    const users = await Users.findOne({
      where: {
        id: transaction.users,
      },
      attributes: {
        exclude: ["email", "createdAt", "updatedAt", "password", "isAdmin"],
      },
    });

    await (transaction["users"] = users);

    res.send({
      status: "success",
      data: {
        transaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transaction = await Transactions.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    for (i = 0; i < transaction.length; i++) {
      const bookPurchased = transaction[i].productPurchased.split(",")
      let bookResult = []

      for ( j = 0; j < bookPurchased.length; j++ ) {
        const book = await Books.findOne({
          where: {
            id: bookPurchased[j]
          },
          attributes : {
            exclude: ["createdAt", "updatedAt"]
          }
        })
        
        bookResult[j] = book
        
      }

      const user = await Users.findOne({
        where: {
          id: transaction[i].users,
        },
        attributes: {
          exclude: ["email", "password", "createdAt", "updatedAt", "isAdmin", "gender", "phone", "address", "profilImage"],
        },
      });      

      transaction[i].users = user;
      transaction[i].productPurchased = bookResult;

    }

    res.send({
      status: "success",
      data: {
        transactions: transaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
