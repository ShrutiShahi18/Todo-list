import React, { useState } from "react";
import axios from "axios";

function Create() {
    const [task, setTask] = useState("");
    const handleAdd = () => {
        axios
            .post("http://localhost:3001/add", { task: task })
            .then((result) => location.reload(result))
            .catch((err) => console.log(err));
    };
    return (
        <div className="create_form">
            <input
                type="text"
                placeholder="Enter task"
                onChange={(e) => setTask(e.target.value)}
                className="input-container"
            />
            <button type="button" onClick={handleAdd} className="add-button">
                Add
            </button>
        </div>
    );
}

export default Create;
