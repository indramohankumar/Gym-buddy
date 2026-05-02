const express = require('express');
const { signupUser, loginUser } = require('../controllers/usercontroller');
//user controller 

const router = express.Router();
//login route 
router.post('/login', loginUser);
//sign-up route
router.post('/signup', signupUser);
 
module.exports = router;