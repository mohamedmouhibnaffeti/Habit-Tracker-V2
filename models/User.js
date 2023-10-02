const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username field is required'],
        minlength: [6, 'Username should be longer than 6 caracters'],
        unique: [true, 'Username already exists in database']
    },
    email: {
        type: String,
        required: [true, 'Username field is required'],
        unique: [true, 'Username already exists in database'],
        validate: [isEmail, 'Please enter a valid email']
    },
    password : {
        type : String,
        required : [true, 'please enter a password'],
        minlength : [6, 'password length must be more than 6 caracters']
    }
})

//hashing password before storing it
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//logging in
userSchema.statics.login = async function(username, password){
    const user = await this.findOne({ username })
    if(user){
        const auth = bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        throw Error('Incorrect Password')
    }
    throw Error('Incorrect Username')
}


const User = mongoose.model('user', userSchema)
module.exports = User