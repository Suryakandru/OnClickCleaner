/* 
Filename:       login.js
Student’s Name: Jiyuan Huang 
StudentID:      301083362
Date:           OCT 16,2020

This for login url setting.
*/
let express = require('express');
let router = express.Router();

let loginController = require('../controllers/login');

/* GET login page. */
router.get('/', loginController.Login);  

/* POST process login page. */

router.post('/', loginController.ProcessLogin);



module.exports = router;