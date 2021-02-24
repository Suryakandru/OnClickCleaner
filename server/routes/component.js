/* 
Filename:       component.js
Project:        On Click Cleaner
Section:        COMP 231-002
Group:          3
Date:           Feb 16,2021

This for contact url setting.
*/
let express = require('express');
let router = express.Router();

let componentController = require('../controllers/component');

/* GET Component-list page. READ */
router.get('/', componentController.DisplayComponentList);
  
/* GET Display Add page. CREATE  */
router.get('/add', componentController.DisplayAddPage);

/* POST process the Add page. CREATE */
router.post('/add', componentController.ProcessAddPage);

/* GET Display Edit page. UPDATE */
router.get('/edit/:id', componentController.DisplayEditPage);

/* POST process the Edit page. UPDATE */
router.post('/edit/:id', componentController.ProcessEditPage);

/* GET process the Delete page. DELETE */
router.get('/delete/:id', componentController.ProcessDeletePage);


module.exports = router;