import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import Todo from "./models/model.todo.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Add a task
app.post("/api/task/add", async (req, res) => {
    const { task } = req.body;
    try {
        const todo = new Todo({ task });
        await todo.save();
        res.status(200).json({ success: true, data: todo });
    } catch (error) {
        console.log("Adding task failure");
        return res.status(500).json({ success: false, data: "Error while adding task" });
    }
});

// Get all tasks
app.get("/api/todos", async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json({ success: true, data: todos });
    } catch (error) {
        console.log("Getting tasks failure");
        return res.status(500).json({ success: false, data: "Error while fetching tasks" });
    }
});

// Delete a task
app.delete("/api/task/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Task deleted." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to delete task." });
    }
});

// Update task status (mark as done/undone)
app.put("/api/task/update/:id", async (req, res) => {
    const { id } = req.params;
    const { isDone } = req.body;
    
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { isDone }, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.status(200).json({ success: true, data: updatedTodo, message: 'Task status updated successfully' });
    } catch (error) {
        console.log("Updating task status failure");
        res.status(500).json({ success: false, message: 'Error while updating task status' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
