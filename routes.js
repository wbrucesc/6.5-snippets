const express = require('express');
const passport = require('passport');

const HomeController = require('./controllers/home');
const UserController = require('./controllers/user');

module.exports = function(app){
const homeRouter = express.Router();
const userRouter = express.Router();

const requireLogin = function (req, res, next) {
if (req.user) {                   //checks to see if there is a user, if not redirect to login
  next();
} else {
  res.redirect('/login');
}
};


//Home routes
homeRouter.use(requireLogin);
homeRouter.get('/', HomeController.index);      //shows list of snippets on home page
homeRouter.post('/', HomeController.add);       //takes input from form and puts on home page
homeRouter.get('/add', HomeController.form);   //when add button clicked takes you to form
homeRouter.get('/:id/delete', HomeController.delete); //deletes snippet when delete button clicked
homeRouter.get('/:id/edit', HomeController.form);   //when edit button clicked takes you to form
homeRouter.post('/search', HomeController.search);   
homeRouter.post('/:id', HomeController.edit);
homeRouter.get('/signOut', HomeController.out); //when sign out button clicked this triggers out
                                                //which destroys session and redirects to login page
//changed to .post @ 3:20
homeRouter.get('/:id/view', HomeController.profile);

//User routes
userRouter.get('/login', UserController.login);
userRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));
userRouter.get('/signup', UserController.signup);
userRouter.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
}));




app.use('/', userRouter);
app.use('/', homeRouter);
};
