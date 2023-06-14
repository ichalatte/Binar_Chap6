const express = require("express");
const router = express.Router();

// Other routes and middleware definitions

// Logout route
router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    // Perform any additional actions you need to do before logging out the user
    // For example, updating the user login history table

    // Redirect the user to the login page after successful logout
    return res.redirect("/login");
  });
});

module.exports = router;