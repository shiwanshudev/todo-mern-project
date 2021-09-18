const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const { body, validationResult } = require("express-validator");
const todo = require("../models/todo");

// create todo
router.post(
  "/add",
  body("title").notEmpty(),
  body("todo").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json("Title and Todo fields are required.");
    }

    // Create new todo if validation successful
    const newTodo = new Todo({
      title: req.body.title,
      todo: req.body.todo,
    });

    try {
      await newTodo.save();
      res.status(200).json("Todo Created!");
    } catch (error) {
      res.status(400).json("Error saving the todo!");
    }
  }
);

// fetch all todos from db
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json("Error finding the todos!");
  }
});

// load single todo
router.get("/:id", async (req, res) => {
  try {
    const foundTodo = await Todo.findById(req.params.id);
    res.status(200).json(foundTodo);
  } catch (error) {
    res.status(400).json("Error finding the Todo!");
  }
});

// update todo in the db
router.post(
  "/update/:id",
  body("title").notEmpty(),
  body("todo").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json("Title and Todo fields are required.");
    }
    try {
      const foundTodo = await Todo.findById(req.params.id);
      foundTodo.title = req.body.title;
      foundTodo.todo = req.body.todo;

      await foundTodo.save();
      res.status(200).json("Updated todo successfully!");
    } catch (error) {
      res.status(400).json("Error updating the Todo!");
    }
  }
);

// remove todo from the db
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json("Removed todo successfully!");
  } catch {
    res.status(400).json("Error removing the Todo!");
  }
});

module.exports = router;
