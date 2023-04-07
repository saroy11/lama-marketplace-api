const jwt = require("jsonwebtoken");

const verifyTokenAndAuthorization = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, data) => {
      if (err)
        return res.status(403).json("Token is not valid!");
      else {
        if (data.id === req.params.id || data.isAdmin)
          next();
        else
          return res.status(401).json("Invalid ID!");
      }

    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

module.exports = { verifyTokenAndAuthorization };
