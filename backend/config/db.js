import mongoose from "mongoose";

export const connectDB = () => {
    try {
        mongoose.connect("mongodb+srv://raisumit585:TodoProject@cluster0.fbysq.mongodb.net/TodoList");
    console.log("Connected to Database");
    } catch (error) {
        console.log("Database connection error");
    }
    
}

