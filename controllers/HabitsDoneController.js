const HabitsDone = require('../models/HabitsDone')
const User = require('../models/User')

module.exports.DoHabit = async (req, res) =>{
    try{
        const {Habit} = req.body
        const ownerID = req.user
        const ownerObject = await User.findOne({_id: ownerID})
        const owner = ownerObject.username
        const Day = new Date()
        const date = Day.getFullYear() + "/" + (Day.getUTCMonth() + 1) + "/" + (Day.getUTCDay() + 1);
        const HabitDone = await HabitsDone.create({Habit, date, date ,owner})
        if(HabitDone){
            res.status(201).json({HabitDone: HabitDone})
        }else{
            res.status(400).json({message: "Error Doing Habit"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.getMyHabitsDone = async (req, res)=>{
    try{
        const userID = req.user
        const user = await User.findById(userID)
        const owner = user.username
        const HabitsDoneFetched = await HabitsDone.find({ owner: owner }).populate(['Owner', 'Habit'])
        HabitsDoneFetched.forEach(HabitDone => {
            HabitDone.Habit = HabitDone.Habit
        })
        if(HabitsDoneFetched.length){
            res.status(200).json({HabitsDone: HabitsDoneFetched, Owner: HabitsDoneFetched[0].Owner})
        }else{
            res.status(400).json({message: "Invalid owner to habit done"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.getMyHabitsDoneToday = async (req, res) =>{
    try{
        const userID = req.user
        const user = await User.findById(userID)
        const owner = user.username
        const Day = new Date()
        const Today = Day.getFullYear() + "/" + (Day.getUTCMonth() + 1) + "/" + (Day.getUTCDay() + 1);
        const HabitsDoneFetched = await HabitsDone.find({ owner: owner, date: Today }).populate(['Owner', 'Habit'])
        HabitsDoneFetched.forEach(HabitDone => {
            HabitDone.Habit = HabitDone.Habit
        })
        if(HabitsDoneFetched.length){
            res.status(200).json({HabitsDone: HabitsDoneFetched, Owner: HabitsDoneFetched[0].Owner})
        }else{
            res.status(400).json({message: `${owner} has no habit done today`})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}



