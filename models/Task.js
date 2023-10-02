const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: [5, 'Task title should be longer than 5 caracters']
    },
    description: {
        type: String,
        null: true
    },
    priority: {
        type: String,
        default: "None"
    },
    completed: {
        type: Boolean,
        default: false
    },
    CreatedFor: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
})

TaskSchema.virtual('Owner', {
    ref: 'user',
    localField: 'owner',
    foreignField: 'username',
    justOne: true,
  });
  

const Task = mongoose.model('task', TaskSchema)
module.exports = Task