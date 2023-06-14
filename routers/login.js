const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  res.render("login", { title: "Login" });
});

router.post("/", (req, res) => {
  const { username, password } = req.body;

  // Read the user list from the JSON file
  const userList = JSON.parse(fs.readFileSync("./db/user.json"));

  // Find the matching user in the user list
  const matchedUser = userList.find(
    (user) => user.username === username && user.password === password
  );

  if (matchedUser) {
    req.session.user = { username: matchedUser.username, role: matchedUser.role };

    if (matchedUser.role === "superuser") {
      res.redirect("/users"); // Redirect to admin dashboard for superuser
    } else {
      res.redirect("/games"); // Redirect to user dashboard for regular users
    }
  } else {
    res.redirect("/login"); // Redirect back to login page if authentication fails
  }
});

module.exports = router;