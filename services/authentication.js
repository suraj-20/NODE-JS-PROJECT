const JWT = require("jsonwebtoken");

SECRET_KEY = "THISISMYSECRETKEY";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImageURL: user.profileImageURL,
  };
  const token = JWT.sign(payload, SECRET_KEY);
  return token;
}

function validateToken(token) {
  if (!token) return null;

  try {
    return JWT.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

module.exports = {
  createTokenForUser,
  validateToken,
};
