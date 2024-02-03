const User = require("../models/user");

module.exports.handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/user/login");
};

module.exports.handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndCreateToken(email, password);
    // console.log("token", token);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", {
      Error: "Invalid User or password!",
    });
  }
};

module.exports.handleUserLogout = (req, res) => {
  return res.clearCookies("token").redirect("/");
}