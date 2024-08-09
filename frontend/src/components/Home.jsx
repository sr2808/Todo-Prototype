import React, { useEffect, useState } from 'react';
import Header from './Header';
import Create from './Create';
import axios from 'axios';
import { toast } from 'react-toastify';
import { binSvg } from '../assets/assets';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [isDone, setIsDone] = useState(false);

    const getTodoList = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/todos");
            if (response.data.success) {
                setTodos(response.data.data);
            } else {
                toast.error("Failed to fetch tasks");
            }
        } catch (error) {
            toast.error("An error occurred while fetching tasks");
        }
    };

    const handleTaskDone = async (id, currentStatus) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/task/update/${id}`, {
                isDone: !currentStatus
            });
            if (response.data.success) {
                setTodos(todos.map(todo =>
                    todo._id === id ? { ...todo, isDone: !currentStatus } : todo
                ));
                toast.success(response.data.message);
            } else {
                toast.error("Failed to update task status");
            }
        } catch (error) {
            toast.error("Internal Server Error");
            console.log(error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/task/delete/${id}`);
            if (response.data.success) {
                setTodos(todos.filter(todo => todo._id !== id));
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Internal Server Error");
            console.log(error);
        }
    };

    useEffect(() => {
        getTodoList();
    }, []);

    return (
        <div className='flex flex-col justify-center items-center gap-2 h-screen w-full'>
            <Header />
            <Create setTodos={setTodos} />
            <div className="flex flex-col justify-center items-center">
                {
                    todos.length === 0 ? (
                        <div className="font-medium">No Tasks</div>
                    ) : (
                        todos.map((task, index) => {
                            return (
                                <div key={index} className={`flex justify-start items-center min-w-[300px] ${task.isDone ? 'bg-green-500' : 'bg-black'} text-white p-2 my-2 rounded-lg`}>
                                    <input 
                                        type="checkbox" 
                                        className='w-4 h-4 rounded-full mx-2 cursor-pointer' 
                                        checked={task.isDone} 
                                        onChange={() => handleTaskDone(task._id, task.isDone)} 
                                    />
                                    <p className={`${task.isDone ? 'line-through' : ''}`}>{task.task}</p> 
                                    <img 
                                        src={binSvg} 
                                        alt="" 
                                        className='w-4 h-4 ml-auto cursor-pointer' 
                                        onClick={() => handleDeleteTask(task._id)} 
                                    />
                                </div>
                            )
                        })
                    )
                }
            </div>
        </div>
    );
}

export default Home;
