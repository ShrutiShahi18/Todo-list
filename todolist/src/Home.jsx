import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
    BsCheckCircleFill,
    BsCircleFill,
    BsFillTrashFill,
} from "react-icons/bs";

function Home() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:3001/get")
            .then((result) => setTodos(result.data))
            .catch((err) => console.log(err));
    }, []);

    const handleEdit = (id, currentStatus) => {
        axios
            .put(`http://localhost:3001/update/${id}`, { done: !currentStatus }) // Toggle the done status
            .then((result) => {
                console.log(result);
                // Update the state to reflect the change
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo._id === id ? { ...todo, done: !currentStatus } : todo
                    )
                );
            })
            .catch((err) => console.log(err));
    };
    

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3001/delete/${id}`)
            .then((result) => {
                console.log(result);
                // Update the state after successful deletion
                setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="home">
            <h2>Todo List</h2>
            <Create />
            <div className="scrollable-container">
            {todos.length === 0 ? (
                <div>
                    <h2>No Record</h2>
                </div>
            ) : (
                todos.map((todo) => (
                    <div key={todo.id} className="task">
                        <div
                            className="checkbox"
                            onClick={() => handleEdit(todo._id, todo.done)}
                        >
                            {todo.done ? (
                                <BsCheckCircleFill className="icon"/>
                            ) : (
                                <BsCircleFill className="icon" />
                            )}
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span>
                                <BsFillTrashFill className="icon" onClick={()=>handleDelete(todo._id)}/>
                            </span>
                        </div>
                    </div>
                ))
            )}
            </div>
        </div>
    );
}

export default Home;
