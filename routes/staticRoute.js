const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  return res.render("home", {
    user: req.user,
  });
});

router.get("/user/signup", (req, res) => {
  return res.render("signup");
});

router.get("/user/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
