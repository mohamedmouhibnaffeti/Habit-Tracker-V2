const Feeling = require('../models/Feeling')
const User = require('../models/User')
//create feeling
module.exports.CreateFeeling = async (req, res)=>{
    try{
        const DateObject = new Date() 
        const date = `${DateObject.getFullYear()}/${DateObject.getMonth()+1}/${DateObject.getDate()}`
        const {title} = req.body
        const userID = req.user
        const user = await User.findById(userID)
        const owner = user.username
        let score = 0
        switch(title){
            case 'Very Sad': score = 0; break;
            case 'Sad': score = 1; break;
            case 'Meh': score = 2; break;
            case 'Normal': score = 3; break; 
            case 'Happy': score = 4; break;
            case 'Very Happy': score = 5; break;
        }
        const feelingCreated = await Feeling.create({title, date, score, owner})
        if(feelingCreated){
            res.status(200).json({FeelingCreated: feelingCreated})
        }
        else{
            res.status(400).json({message: "Error creating feeling"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

//get all feelings
module.exports.getAllFeelings = async (req, res) =>{
    try{
        const FeelingsFetched = await Feeling.find()
        if(FeelingsFetched.length){
            res.status(200).json({Feelings: FeelingsFetched})
        }
        else{
            res.status(400).json({message: "No feelings found in database"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
//get my feelings
module.exports.getMyFeelings = async(req, res) =>{
    try{
        const userID = req.user
        const user = await User.findById(userID)
        const owner = user.username
        const MyFeelings = await Feeling.find({owner: owner}).populate('Owner')
        if(MyFeelings.length){
            res.status(200).json({MyFeelings: MyFeelings, Owner: MyFeelings[0].Owner})
        }else{
            res.statsu(400).json({message: `No feelings for ${owner}`})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

//get user feelings
module.exports.getUserFeelings = async (req, res) =>{
    try{
        const owner = req.query.owner
        const FeelingsFetched = await Feeling.find({owner: owner})
        if(FeelingsFetched.length){
            res.status(200).json({Feelings: FeelingsFetched})
        }
        else{
            res.status(400).json({message: "No feelings found for the given user"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

//get today's feelings of me
module.exports.getMyFeelingsToday = async(req, res) =>{
    try{
        const Today = new Date
        const date = `${Today.getFullYear()}/${Today.getMonth()+1}/${Today.getDate()}`
        const user = await User.findById(req.user)
        const owner = user.username
        const FeelingsFetched = await Feeling.find({owner: owner, date: date})
        if(FeelingsFetched.length){
            res.status(200).json({FeelingsFetched: FeelingsFetched, date: date, owner: user})
        }
        else{
            res.status(400).json({message: "No feelings found today"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.UpdateFeeling = async(req, res)=>{
    try{
        const {title} = req.body
        const Today = new Date
        const date = `${Today.getFullYear()}/${Today.getMonth()+1}/${Today.getDate()}`
        let score = 0
        switch(title){
            case 'Very Sad': score = 0; break;
            case 'Sad': score = 1; break;
            case 'Meh': score = 2; break;
            case 'Normal': score = 3; break; 
            case 'Happy': score = 4; break;
            case 'Very Happy': score = 5; break;
        }
        const FeelingID = req.query.FeelingID
        const UpdatedFeeling = await Feeling.findOneAndUpdate({_id: FeelingID}, {title, date, score}, {new: true})
        if(UpdatedFeeling){
            res.status(200).json({UpdatedFeeling: UpdatedFeeling})
        }else{
            res.status(400).json({message: "Cannot update feeling"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports.DeleteFeeling = async (req, res)=>{
    try{
        const FeelingID = req.query.FeelingID
        const DeletedFeeling = await Feeling.deleteOne({_id: FeelingID})
        if(DeletedFeeling.deletedCount > 0 && DeletedFeeling.acknowledged === true){
            res.status(204).json({message: "Feeling deleted successfully"})
        }
        else{
            res.status(400).json({message: "Invalid Task ID"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}