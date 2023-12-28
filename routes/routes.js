const express = require('express');
const router= express.Router();
const {Verify,Register}=require('../controllers/userRegistration');
const createNewProduct=require('../controllers/items')
router.route('/register').post(Register)
router.route('/createItem').post(createNewProduct)
router.route('/verify').get(Verify)
module.exports=router;