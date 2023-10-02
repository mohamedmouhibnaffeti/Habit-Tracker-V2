const mongoose = require('mongoose')

const HabitsDoneSchema = mongoose.Schema({
    Habit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'habit'
    },
    date: {
        type: String,
        required: true
    },
    owner:{
        type: String,
        required: true
    }
})

HabitsDoneSchema.virtual('Owner', {
    ref: 'user',
    localField: 'owner',
    foreignField: 'username',
    justOne: true,
});
  
const HabitsDone = mongoose.model('habitDone', HabitsDoneSchema)
module.exports = HabitsDone