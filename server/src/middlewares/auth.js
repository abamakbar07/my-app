const jwt = require("jsonwebtoken");

exports.loginAuth = (req, res, next) => {
  let header, token;

  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  )
    return res.status(400).send({
      message: "Access Denied",
    });

  try {
    const adminKey = process.env.IS_ADMIN;
    const userKey = process.env.IS_USER;
    const secretKey = "secret-key"
    const verified = jwt.verify(token, secretKey);

    // (req.jwt = verified),
    //   console.log("hasil req verified in auth", verified.id);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({
      message: "Invalid Token",
    });
  }
};
