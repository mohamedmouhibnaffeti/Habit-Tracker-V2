const Habit = require('../models/Habit')


//get all habits
module.exports.GetAll = async (req, res)=>{
    try{
        const Habits = await Habit.find()
        if(Habits.length){
            res.status(200).json({Habits: Habits})
        }else{
            res.status(400).json({message: 'No habits found in database'})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

//create new habit
module.exports.CreateHabit = async (req, res)=>{
    try{
        const {title, forWhat, type, score} = req.body
        const habitCreated = await Habit.create({title, forWhat, type, score})
        if(habitCreated){
            res.status(201).json({HabitCreated: habitCreated})
        }else{
            res.status(400).json({message: 'Error Creating Habit'})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

//get all habits by type
module.exports.GetAllHabitsByType = async (req, res)=>{
    try{
        const HabitType = req.query.HabitType
        const Habits = await Habit.find({type: HabitType})
        if(Habits.length){
            res.status(200).json({Habits: Habits})
        }else{
            res.status(400).json({message: `No ${HabitType} habits found in database`})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
