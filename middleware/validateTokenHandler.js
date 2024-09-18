const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    // in this line  by mistake startswith ki jagh maine startwith likh diya tha "s" missing tha usko dhudhane me 25 min lage humko
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "User is not autuhorized" });
      }
      //   console.log(decoded);
      //   res.status(200).json({ message: "Token is valid", decoded });
      req.user = decoded.user;
      next();
    });
  } else {
    res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }
});

module.exports = validateToken;
