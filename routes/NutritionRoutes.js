const express = require('express')
const NutritionController = require('../controllers/NutritionController')

const router = express.Router()

router.get('/GetNutritionFacts', NutritionController.GetNutritionFacts)

module.exports = router