const UserController = require("./user_controller");
const userRoute = () => {
  const router = require("express").Router();
  const checkAuthenticationMiddleware = require("../middlewares/check_authentication");
  const controller = new UserController();

  router.get("/login", controller.loginPage);
  router.post("/login", controller.doLogin);

  const authenticated = router.use(checkAuthenticationMiddleware);
  authenticated.get("/", controller.userPage);
  authenticated.get("/admin", controller.adminPage);

  router.get("/logout", controller.logout);

  return router;
};

module.exports = (app) => {
  app.use("/", userRoute());
};