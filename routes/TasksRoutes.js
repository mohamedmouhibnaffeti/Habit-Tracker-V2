const express = require('express')
const TaskController = require('../controllers/TasksController')
const authenticateUser = require('../middleware/AuthMiddleware')


const router = express.Router()

router.get('/getMyTasks',authenticateUser ,TaskController.GetMyTasks)
router.get('/getAllTasks', authenticateUser, TaskController.GetAllTasks)
router.get('/getUserTasks', authenticateUser, TaskController.getUserTasks)
router.get('/getMyTasksToday', authenticateUser, TaskController.getMyTasksToday)
router.post('/createTask',authenticateUser ,TaskController.CreateTask)
router.put('/updateTask',authenticateUser ,TaskController.UpdateTask)
router.delete('/deleteTask', authenticateUser, TaskController.DeleteTask)

module.exports = router