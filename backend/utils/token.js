const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: (token) => jwt.verify(token, 'SECRETKEY')
};
