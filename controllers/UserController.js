const User = require('../models/User')

module.exports.CreateUser = async (req, res) => {
    const {username, email, password} = req.body
    try{
        const userCreated = await User.create({username, email, password})
        if(userCreated){
            res.status(201).json({message: "user created successfully", User: userCreated})
        }
        else{
            res.status(400).json({message: "Error creating user"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    } 
}

module.exports.UpdateUser = async (req, res) => {
    const {username, email, password} = req.body
    const UserID = req.query.USER_ID
    try{
        const UpdatedUser = await User.findOneAndUpdate({_id: UserID}, {username, email, password}, {new:true})
        if(UpdatedUser){
            res.status(200).json({message: "User updated successfully", User: UpdatedUser})
        }
        else{
            res.status(400).json({message: "Error updating user"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.GetAllUsers = async (req, res) =>{
    try{
        const Users = await User.find()
        if(Users){
            res.status(200).json({Users: Users})
        }
        else{
            res.status(400).json({message: "No Users Found in database"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.DeleteUser = async (req, res) =>{
    try{
        const UserID = req.query.USER_ID
        const DeletedUser = await User.deleteOne({_id: UserID})
        if(DeletedUser.acknowledged === true && DeletedUser.deletedCount > 0){
            res.status(200).json({message: "User Deleted Successfully"})
        }
        else{
            res.status(400).json({message: "Invalid User to delete"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.GetUserByUsername = async (req, res) => {
    try{
        const UserFetched = await User.findOne({username: req.query.USERNAME})
        if(UserFetched){
            res.status(200).json({User: UserFetched})
        }
        else{
            res.status(400).json({message: "No users with the provided username"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.GetUserByEmail = async (req, res) => {
    try{
        const UserFetched = await User.findOne({email: req.query.EMAIL})
        if(UserFetched){
            res.status(200).json({User: UserFetched})
        }
        else{
            res.status(400).json({message: "No users with the provided email adress"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}