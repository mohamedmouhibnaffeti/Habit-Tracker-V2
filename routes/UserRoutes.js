const express = require('express')
const authenticateUser = require('../middleware/AuthMiddleware')
const UserController = require('../controllers/UserController')

const router = express.Router()

router.post('/CreateUser', authenticateUser, UserController.CreateUser)
router.put('/UpdateUser', authenticateUser, UserController.UpdateUser)
router.get('/GetAllUsers', authenticateUser, UserController.GetAllUsers)
router.delete('/DeleteUser', authenticateUser, UserController.DeleteUser)
router.get('/GetUserByUsername', authenticateUser, UserController.GetUserByUsername)
router.get('/GetUserByEmail', authenticateUser, UserController.GetUserByEmail)

module.exports = router