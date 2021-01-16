const express = require('express')
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../jwt/jwtHelper');

router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);
router.put('/updateProfile/:id',ctrlUser.updateProfile);
router.get('/forgot/:email',ctrlUser.forgot);
module.exports = router;