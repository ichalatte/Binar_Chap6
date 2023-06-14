const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
  const name = req.query.name || "player";
  console.log(name);
  res.render("games", {
    title: "Try Game",
    name: name,
  });
});

module.exports = router;
