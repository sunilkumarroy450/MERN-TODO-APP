const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user.todo.model");
const app = express();
mongoose.set("strictQuery", true);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/mern-todo-app")
  .then(() => console.log("Connected to DB"))
  .catch(console.error);
///Routes
app.get("/", (req, res) => {
  res.send("Hello There!!");
});

app.get("/todo", async (req, res) => {
  const todos = await UserModel.find();

  res.json(todos);
});

app.post("/todo", (req, res) => {
  const todos = new UserModel({ text: req.body.text });
  todos.save();
  res.json(todos);
});

app.delete("/todo/:id", async (req, res) => {
  const result = await UserModel.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.put("/todo/status/:id", async (req, res) => {
  const updatedStatus = await UserModel.findById(req.params.id);
  updatedStatus.status = !updatedStatus.status;

  updatedStatus.save();
  res.json(updatedStatus);
});

app.listen(8080, () =>
  console.log("Server is started on http://localhost:8080")
);
