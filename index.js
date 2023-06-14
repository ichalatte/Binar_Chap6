const express = require('express');
const { UserGame, UserGameBiodata } = require('./models');
const users = require('./db/user.json');
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mainRouter = require("./routers/main");
const gamesRouter = require("./routers/games");
const loginRouter = require("./routers/login");
const apiRouter = require("./routers/api");
const adminRouter = require("./routers/admin");
const authRouter = require("./routers/auth");
const usersRouter = require('./routers/users');
const expressSession = require("express-session")
const app = express();

const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  expressSession({
    secret: "ewfewf",
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", mainRouter);
app.use("/games", gamesRouter);
app.use("/login", loginRouter);
app.use("/api", apiRouter);
app.use("/admin",adminRouter);
app.use('/users', usersRouter);
app.use(authRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.get('/users/create', (req, res) => {
  res.render('create_user');
});
app.post('/users/create', (req, res) => {
  const { email, username, password, name } = req.body;

  UserGame.create({ email, username, password }).then((newUser) => {
    UserGameBiodata.create({
      name,
      user_id: newUser.id,
    });
    res.status(201).catch((error) => {
      res.status(422).json("Can't create user", error);
    });
  });
});



//require("./controllers")(app);
app.listen(port, () => {
  console.log('Server running on http://localhost:${3000}');
});

module.exports = app;