const express = require("express");
const router = express();

router.use(express.Router());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res, next) => {
  const name = req.query.name;
  res.render("main", { title: "Main Page", name: name });
});

router.post("/", (req, res, next) => {
  const user = req.query;
  console.log(user);
  
  res.render("/", { title: "Main Page", name: user.name });
});

module.exports = router;
