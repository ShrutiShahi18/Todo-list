const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./models/todo.js");

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test");

app.get("/get", (req, res) => {
    TodoModel.find()
        .then((result) => res.json(result))
        .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { done } = req.body;

    TodoModel.findByIdAndUpdate(id, { done: done }, { new: true })
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task,
    })
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});
app.listen(3001, () => {
    console.log("Server is running");
});
