const mongoose = require('mongoose');

let todoSchema = new mongoose.Schema({
    task: {
        type: String,
        trim: true,
        required: true
    },
    isComp: {
        type: Boolean,
        default: false
    },
    Schedule_date: {
        type: Date
    }
})

let Todo = mongoose.model("todo", todoSchema);
module.exports = Todo;