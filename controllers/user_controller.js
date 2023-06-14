const credentials = require("../db/user.json");

class UserController {
  async loginPage(req, res) {
    if (req.session.User) {
      return res.redirect("/");
    }

    return res.render("login");
  }

  async doLogin(req, res) {
    const { username, password } = req.body;

    const foundIndex = credentials.findIndex((crendetial) => {
      return crendetial.username == username && crendetial.password == password;
    });

    if (foundIndex == -1) {
      return res.redirect("/login");
    }

    const userLogin = credentials[foundIndex];

    // set session
    req.session.User = userLogin;

    // insert ke database

    if (userLogin.role == "superuser") {
      return res.redirect("/admin");
    } else if (userLogin.role == "user") {
      return res.redirect("/");
    }
  }

  async userPage(req, res) {
    const { username, role } = req.session.User;

    return res.render("games", {
      username,
      role,
    });
  }

  async adminPage(req, res) {
    const { username, role } = req.session.User;
    if (role != "superuser") {
      return res.redirect("/login");
    }

    return res.render("admin", {
      username,
      role,
    });
  }
}

module.exports = UserController;