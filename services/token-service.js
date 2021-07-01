const jwt = require("jsonwebtoken");

class TokenService {
  generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    return token;
  }

  validateToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET);

      return userData;
    } catch (e) {
      return null;
    }
  }
}

module.exports = new TokenService();
