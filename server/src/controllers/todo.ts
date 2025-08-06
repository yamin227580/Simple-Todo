import { Request, Response } from "express";
import { Todo } from "../models/todo";

export const newTodoCreate = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const createdNewTodo = await Todo.create({ title });
    res
      .status(201)
      .json({ message: "New todo is created", todo: createdNewTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ message: "All todos fetched.", todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getSingleTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    res.json({ message: "Todo has been fetched.", todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, {
      title,
    });
    res
      .status(200)
      .json({ message: "Todo has been updated.", todo: updatedTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo has been deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
