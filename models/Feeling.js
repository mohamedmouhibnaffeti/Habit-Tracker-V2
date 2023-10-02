const mongoose = require('mongoose')

const FeelingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        enum: ['Very Sad', 'Sad', 'Meh', 'Normal', 'Happy', 'Very Happy'],
        default: 'Meh'
    },
    date: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    owner: {
        type: String,
        required: true
    }
})

FeelingSchema.virtual('Owner', {
    ref: 'user',
    localField: 'owner',
    foreignField: 'username',
    justOne: true,
});
  
const Feeling = mongoose.model('feeling', FeelingSchema)
module.exports = Feeling