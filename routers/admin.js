const express = require("express");
const router = express.Router();

// Admin Dashboard
router.get("/", (req, res, next) => {
  if (req.session.user && req.session.user.role === "superuser") {
    res.render("users", { title: "users" });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
