const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constatns');

function auth(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  try {
    const veryfyResult = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    res.status(403).end();
  }
}

module.exports = auth;
