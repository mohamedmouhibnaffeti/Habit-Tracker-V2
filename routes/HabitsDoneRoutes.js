const express = require('express')
const HabitsDoneController = require('../controllers/HabitsDoneController')
const authenticateUser = require('../middleware/AuthMiddleware')
const router = express.Router()

router.post('/', authenticateUser, HabitsDoneController.DoHabit)
router.get('/', authenticateUser, HabitsDoneController.getMyHabitsDone)
router.get('/Today', authenticateUser, HabitsDoneController.getMyHabitsDoneToday)

module.exports = router