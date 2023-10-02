const dotenv = require('dotenv')
const axios = require('axios')
dotenv.config({path: '../.env'})

module.exports.GetNutritionFacts = async (req, res) => {
    ingr = req.query.foodToTrack
    try{
        const response = await axios.get(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&nutrition-type=cooking&ingr=${ingr}`)
        if(response.data){
            try{
                const data = response.data
                const nutrients = data.totalNutrients;
                const ingredient = data.ingredients[0]
                const NutrientsResponse = {
                    calories : nutrients.ENERC_KCAL ? nutrients.ENERC_KCAL.quantity : 0,
                    totalFat : nutrients.FAT ? nutrients.FAT.quantity.toFixed(2) : 0,
                    saturatedFat : nutrients.FASAT ? nutrients.FASAT.quantity.toFixed(2) : 0,
                    transFat :  nutrients.FATRN ? nutrients.FATRN.quantity.toFixed(2) : 0,
                    cholesterol : nutrients.CHOLE ? nutrients.CHOLE.quantity.toFixed(2) : 0,
                    sodium : nutrients.NA ? nutrients.NA.quantity.toFixed(2) : 0,
                    totalCarbohydrate : nutrients.CHOCDF ? nutrients.CHOCDF.quantity.toFixed(2) : 0,
                    dietaryFiber : nutrients.FIBTG ? nutrients.FIBTG.quantity.toFixed(2) : 0,
                    totalSugars : nutrients.SUGAR ? nutrients.SUGAR.quantity.toFixed(2) : 0,
                    totalCO2Emissions: data.totalCO2Emissions ? data.totalCO2Emissions.toFixed(2) : 0 ,
                    protein : nutrients.PROCNT ? nutrients.PROCNT.quantity.toFixed(2) : 0,
                    vitaminD : nutrients.VITD ? nutrients.VITD.quantity.toFixed(2) : 0,
                    calcium : nutrients.CA ? nutrients.CA.quantity.toFixed(2) : 0,
                    iron : nutrients.FE ? nutrients.FE.quantity.toFixed(2) : 0,
                    potassium : nutrients.K ? nutrients.K.quantity.toFixed(2) : 0,
                    quantity: ingredient.parsed[0] ? ingredient.parsed[0].quantity : 0,
                    unit: ingredient.parsed[0] ? ingredient.parsed[0].measure : "",
                    food: ingredient.parsed[0] ? ingredient.parsed[0].food : "",
                    weight: ingredient.parsed[0] ? ingredient.parsed[0].weight : 0,
                    
                }
                res.send(NutrientsResponse)
            }catch(err){
                res.status(400).json({message: err.message})
            }
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}