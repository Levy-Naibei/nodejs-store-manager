const express = require('express');

const router = express.Router();
const UserController = require('../controller/users');
const checkJwt = require('../middleware/auth-setup');

/**
 * NOTE: no need for logout route because we dont store user sessions 
 * that needs to be cleared on logout - 
 * RESTful API is stateless; doesnt matter which client connects; no session storage
 * NOTE: Functionality to manage user roles to be added ... wait
 */

 /**
  *@desc    signs up new user
  @route    POST    /users/signup
  */
router.post('/signup', UserController.register_user);

/**
 * @desc    login user
 * @route   POST    /users/login
 */
router.post('/login', UserController.login_user);

/**
 * @desc    delete user
 * @route   DELETE users/:id
 */
router.delete('/:id', checkJwt, UserController.delete_user);

module.exports = router;