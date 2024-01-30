const { validateToken } = require("../services/authentication");

function checkForAuthentication() {
  return (req, res, next) => {
    const tokenCookie = req.cookies?.token;

    if (!tokenCookie) return next();

    const token = validateToken(tokenCookie);
    req.user = token;

    return next();
  };
}

module.exports = {
  checkForAuthentication,
};
