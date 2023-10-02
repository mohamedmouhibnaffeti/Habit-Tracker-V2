const mongoose = require('mongoose')

const habitSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'please insert habit title'],
        minlength: [6, 'habit title must be longer than 6 caracters']
    },
    forWhat: {
        type: String,
        required: true,
        enum: ['Mine', 'To Raise'],
        default: 'Mine'
    },
    type: {
        type: String, 
        required: true,
        enum: ['Good', 'Bad', 'Nutural'],
        default: "Nutural"
    },
    score: {
        type: Number,
        default: 0
    }
})

const Habit = mongoose.model('habit', habitSchema)
module.exports = Habit  
