/* 
Filename:       component.js
Student’s Name: Jiyuan Huang 
StudentID:      301083362
Date:           OCT 16,2020

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