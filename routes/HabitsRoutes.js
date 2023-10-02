const express = require('express')
const HabitsController = require('../controllers/HabitsController')
const router = express.Router()

router.get('/', HabitsController.GetAll )
router.get('/Type', HabitsController.GetAllHabitsByType )
router.post('/', HabitsController.CreateHabit )

module.exports = router