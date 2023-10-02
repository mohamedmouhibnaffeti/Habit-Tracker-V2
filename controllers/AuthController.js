const User = require('../models/User')
const jwt = require('jsonwebtoken')

const maxAge = 60 * 3 * 24
const create_token = (id) =>{
    return jwt.sign({ id }, 'mohamed mouhib naffeti secret', {
        expiresIn : maxAge
    })
}

const handleErrors = (err) =>{
    let error = {username : '', email : '', password : ''}

    //duplicate value error
    if(err.code === 11000){
        if(err.message.includes('username_1 dup key')){
            error['username'] = "username already exists"
        }
        if(err.message.includes('email_1 dup key')){
            error['email'] = "email already exsits"
        }
        return error
    }
    //validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            error[properties.path] = properties.message
        })
    }
    return error
}

module.exports.signup = async (req, res) =>{
    const {username, email, password, confirmPassword} = req.body
    if(confirmPassword === password){
        try{
            const user = await User.create({username, email, password})
            const token = create_token(user._id)
            res.cookie('jwt', token, {maxAge : maxAge * 1000})
            res.status(200).json({message: "user created successfully",
                                  User : user,                         
            })
        }catch(err){
            res.status(500).json(handleErrors(err))
        }
    }
    else{
        res.status(400).json({message: 'Passwords do not match'})
    }
}

module.exports.login = async (req, res) =>{
    const { username, password } = req.body
    try{
            const user = await User.login(username, password)
            const token = create_token(user._id)
            res.cookie('jwt', token, {maxAge : maxAge * 1000})
            res.status(200).json({ jwt : token })
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

module.exports.logout = (req, res) =>{
    res.cookie('jwt', '', {maxAge : 1})
    res.send('Logged out')
}