const authorRouters = require('express').Router()
const authorController = require('../controllers/Author')
const { body } = require('express-validator');
//Get list by address 
authorRouters.post('/', [
], authorController.index)
//Add notification
authorRouters.post('/create',
    [
        body('noti_id', 'Address is required').not().isEmpty(),
        body('name', 'Title is required').not().isEmpty(),
        body('age', 'Content is required').not().isEmpty(),
    ], authorController.create)
// Update status notification
authorRouters.post('/update', [
    body('status', 'Status is required').not().isEmpty(),
    body('address', 'Address is required').not().isEmpty(),
    body('id', 'Id is required').not().isEmpty(),
], authorController.update)
module.exports = authorRouters
