import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    task: {
        type:String,
    },
    isDone: {
        type: Boolean,
        default: false
    }
},{ timestamps: true });

const Todo = mongoose.model("todos", todoSchema);

export default Todo;