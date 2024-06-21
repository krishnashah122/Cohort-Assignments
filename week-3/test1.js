const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const { User } = require("../db/index.js");

async function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ msg: "Authorization header missing" });
  }

  const words = authHeader.split(" ");
  if (words.length !== 2 || words[0] !== "Bearer") {
    return res.status(403).json({ msg: "Invalid authorization format" });
  }

  const jwtToken = words[1];
  const decodedValue = null;
  console.log(jwtToken)
  try {
    decodedValue = jwt.verify(jwtToken, jwtSecret);
    
  } catch (error) {
    console.log(decodedValue)
    return res.status(403).json({ msg: "Invalid token 123" });
  }

  let existingUsername = decodedValue.username;
  try {
    const thatUser = await User.findOne({ existingUsername });
    if (thatUser.username === existingUsername) {
      next();
    } else {
      res.status(403).json({ msg: "Username Not Found In Database" });
    }
  } catch (error) {
    res.status(403).json({ msg: "Username Not Found In Database" });
  }
}

module.exports = userMiddleware;
