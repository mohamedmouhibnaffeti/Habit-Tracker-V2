const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

//importing routes
const NutritionRouter = require('./routes/NutritionRoutes')
const AuthRoutes = require('./routes/AuthRoutes')
const TaskRoutes = require('./routes/TasksRoutes')
const UserRoutes = require('./routes/UserRoutes')
const HabitsRoutes = require('./routes/HabitsRoutes')
const HabitsDoneRouter = require('./routes/HabitsDoneRoutes')
const FeelingRouter = require('./routes/FeelingRoutes')

dotenv.config('./.env')
const app = express()

//database connection
mongoose.connect('mongodb://127.0.0.1:27017/HabitTracker')
const db = mongoose.connection
db.on('error', (error)=>console.log(error))
db.once('open', ()=>console.log('connected to database'))

//middleware
app.use(express.json())
app.use(cors())

//Routes
app.use('/Nutrition', NutritionRouter)
app.use('/Auth', AuthRoutes)
app.use('/Tasks', TaskRoutes)
app.use('/UserManagement', UserRoutes)
app.use('/Habits', HabitsRoutes)
app.use('/habitsDone', HabitsDoneRouter)
app.use('/Feelings', FeelingRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server is Working on : http://localhost:${PORT}`)
})