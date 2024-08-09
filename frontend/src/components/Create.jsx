import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Create = ({setTodos}) => {
  const [input, setInput] = useState("");

  const handleAdd = async (input) => {
    console.log(input);
    
   try {
    const response = await axios.post("http://localhost:5000/api/task/add",
      {task: input}
    );
    location.reload();  
    setInput("")
   } catch (error) {
    toast.error(response.data.data)
   }
  };

  const handleKeyDown = (e) => {
    if(e.key==="Enter") {
        handleAdd();
    }
}

  return (
    <div>
      <div className="flex">
        <input
          type="text"
          className="border border-black px-3 py-1.5 rounded-l-lg text-md w-60 outline-none"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Enter Task"
        />
        <button
          className="bg-black text-white text-md px-2 py-1 rounded-r-lg"
          onClick={() => handleAdd(input)}
          onKeyDown={(e)=> handleKeyDown}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Create;
