const express = require('express')
const FeelingController = require('../controllers/FeelingController')
const authenticateUser = require('../middleware/AuthMiddleware')
const router = express.Router()

router.get('/', authenticateUser, FeelingController.getAllFeelings)
router.get('/MyFeelings', authenticateUser, FeelingController.getMyFeelings)
router.get('/user', authenticateUser, FeelingController.getUserFeelings)
router.get('/MyFeelings/Today', authenticateUser, FeelingController.getMyFeelingsToday)
router.delete('/', authenticateUser, FeelingController.DeleteFeeling)
router.post('/', authenticateUser, FeelingController.CreateFeeling)
router.put('/', authenticateUser, FeelingController.UpdateFeeling)



module.exports = router