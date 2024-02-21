const express = require('express');
const router = express.Router()
const dbController = require('../controller/users')
const middleware = require('../middleware/users')

router.get('/users',middleware.authenticateToken,dbController.getallusers)
router.post('/user',dbController.createUsers)
router.get('/user/:id',dbController.getUsersById)
router.put('/user',dbController.updateUsers)
router.delete('/user',dbController.deleteUsers)
////////////////////////////Login Authen
router.post('/logindata',dbController.createUsersdata)
router.get('/logindataall',dbController.getallusersdata)
router.post('/checkdata',dbController.checkusersdata)

module.exports = router