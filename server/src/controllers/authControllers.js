const { Users } = require("../../models");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const isAdmin = false;

  try {
    const { fullname, email, password } = req.body;

    const schema = Joi.object({
      fullname: Joi.string().min(3).required(),
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });

    const checkEmail = await Users.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(400).send({
        status: "Failed",
        message: `Email already exsited`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      fullname,
      email,
      password: hashedPassword,
      isAdmin,
    });

    // const privateKey = isAdmin ? process.env.IS_ADMIN : process.env.IS_USER;
    const secretKey = "secret-key"

    const token = jwt.sign(
      {
        id: user.id,
      },
      secretKey
    );

    console.log("Backend: Register success")

    res.send({
      status: "success",
      message: "You succesfully registered",
      data: {
        user: {
          email: user.email,
          token,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });

    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (!user)
      return res.status(400).send({
        message: "Your Credentials is not valid",
      });

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass)
      return res.status(400).send({
        message: "Your Credentials is not valid",
      });

    // const secretKey = user.isAdmin ? process.env.IS_ADMIN : process.env.IS_USER;
    const secretKey = "secret-key"
    const token = jwt.sign(
      {
        id: user.id,
      },
      secretKey
    );

    res.send({
      status: "success",
      message: "Login Success",
      data: {
        user: {
          id: user.id,
          fullname: user.fullname,
          email,
          isAdmin: user.isAdmin,
         //  gender: user.gender,
         //  phone: user.phone,
         //  address: user.address,
          profilImage: user.profilImage,
          token,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"]
      }
    });

    res.send({
      status: "success",
      message: "User Valid",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
