const express = require('express');
const router = express.Router();
const {UserGame, UserGameBiodata} = require('../models');
const users = require('../db/user.json');
// Import necessary modules and models

router.get('/', (req, res, next) => {
    if (req.session.user && req.session.user.role === "superuser") {
        UserGame.findAll({
            include: UserGameBiodata,
          })
            .then((data) => {
              res.render('users', { data });
            })
            .catch((error) => {
              console.log('Oops! Something went wrong', error);
              // Handle the error and send an appropriate response
              res.status(500).send('Internal Server Error');
            });
      } else {
        res.redirect("/login");
      }  
   
    });

    // Create

    router.get('/create', (req, res, next) => {
        res.render('create_user');
        });
        
        router.post('/create', (req, res) => {
            const { email, username, password, name} = req.body;
          
            UserGame.create({ email, username, password, })
              .then((newUser) => {
                UserGameBiodata.create({
                    name,
                    user_id: newUser.id,
                  });
                res.redirect('/users');
              })
              .catch((error) => {
                console.log('An error occurred while creating a new user:', error);
                res.status(500).send('Internal Server Error');
              });
          });
          // DELETE /router/users/:id (to delete a specific user)
router.get('/delete/:id', (req, res, next) => {
   
    UserGame.destroy({ where: { id: req.params.id }, returning: true })
      .then((_) => {
        res.redirect('/users');
      })
      .catch((error) => {
        console.log('An error occurred while deleting a user:', error);
        res.status(500).send('Internal Server Error');
      });
  });

  // update /router/users/:id (to delete a specific user)
  router.get('/update/:id', (req, res) => {
    UserGame.findOne({
      where: { id: req.params.id },
      include: UserGameBiodata,
    }).then((user) => {
      res.render('update_user', { user });
    });
  });
  router.post('/update/:id', (req, res) => {
    const { email, username, password, name } = req.body;
  
    UserGame.update(
      { email, username, password },
      { where: { id: req.params.id }, returning: true }
    )
      .then((user) => {
        UserGame.findOne({
          where: { id: req.params.id },
          include: UserGameBiodata,
        }).then((user1) => {
          UserGameBiodata.update(
            {
              name,
            },
            { where: { id: user1.UserGameBiodatum.id } }
          );
          res.status(201);
        });
      })
      .catch((error) => {
        res.status(400).json("Can't update user", error);
      });
  });
// Export the router
module.exports = router;