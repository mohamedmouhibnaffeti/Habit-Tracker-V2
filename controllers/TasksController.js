const Task = require('../models/Task')
const User = require('../models/User')

module.exports.CreateTask = async (req, res) =>{
    try{
        const {title, description, priority, date} = req.body
        if(!date){
            res.status(400).json({message: "date is required"})
            return
        }
        const dateObjectConversion = new Date(date)
        const CreatedFor = dateObjectConversion.getFullYear() + "/" + (dateObjectConversion.getMonth() + 1) + "/" + dateObjectConversion.getDate();    
        const userId = req.user
        const ownerObject = await User.findById(userId)
        const owner = ownerObject.username    
        const task = await Task.create({title, description, priority, CreatedFor, owner})
        if(task){
            res.status(201).json({Task_Created_Successfully:task})
        }else{
            res.status(400).json("Unable to create task")
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.GetMyTasks = async (req, res) =>{
    const userId = req.user
    const user = await User.findById(userId)
    const owner = user.username
    try{
        const task = await Task.find({ owner: owner }).populate('Owner')
        if(task.length){
            res.status(201).json({ Task: task, owner: task[0].Owner })
        }
        else{
            res.status(400).json("Invalid Owner to task")
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.UpdateTask = async(req, res) => {
    try{
        const {title, description,completed ,priority, date} = req.body
        const taskID = req.query.taskID
        if(date){
            const dateObjectConversion = new Date(date)
            const CreatedFor = dateObjectConversion.getFullYear() + "/" + (dateObjectConversion.getMonth() + 1) + "/" + dateObjectConversion.getDate();  
            const updatedTask = await Task.findOneAndUpdate({ _id: taskID }, {title, description,completed ,priority, CreatedFor}, {new: true})
            if(updatedTask){
                res.status(202).json({message: "Task updated successfully", New_Task: updatedTask})
            }
            else{
                res.status(400).json("Invalid Task ID")
            }
        }
        else{
            const updatedTask = await Task.findOneAndUpdate({ _id: taskID }, {title, description,completed ,priority}, {new: true})
            if(updatedTask){
                res.status(202).json({message: "Task updated successfully", New_Task: updatedTask})
            }
            else{
                res.status(400).json("Invalid Task ID")
            }
        }            
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.DeleteTask = async(req, res) => {
    const taskID = req.query.taskID
    try{
        const DeletedTask = await Task.deleteOne({ _id: taskID })
        if(DeletedTask.deletedCount > 0 && DeletedTask.acknowledged === true){
            res.status(204).json({message: "Task deleted successfully"})
        }
        else{
            res.status(400).json({message: "Invalid Task ID"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.GetAllTasks = async(req, res) => {
    try{
        const Tasks = await Task.find()
        if(Tasks){
            res.status(200).json({Tasks: Tasks})
        }
        else{
            res.status(400).json({message: "No tasks in database"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.getUserTasks = async (req, res) =>{
    try{
        const owner = req.query.ownerID
        const tasks = await Task.find({ owner: owner })
        if( tasks.length ){
            res.status(200).json({Tasks: tasks})
        }
        else{
            res.status(400).json({message: `No tasks found for the given username: ${owner}`})
        }
    }catch(err){res.status(500).json({message: err.message})}
}


module.exports.getMyTasksToday = async(req, res)=>{
    try{
        const userId = req.user
        const user = await User.findById(userId)
        const owner = user.username
        const Day = new Date()
        const Today = Day.getFullYear() + "/" + (Day.getUTCMonth() + 1) + "/" + (Day.getUTCDay() + 1);        
        const task = await Task.find({ owner: owner, CreatedFor: Today}).populate('Owner')
        if(task.length){
            res.status(201).json({ Task: task, owner: task[0].Owner })
        }
        else{
            res.status(400).json("Invalid Owner to task")
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}