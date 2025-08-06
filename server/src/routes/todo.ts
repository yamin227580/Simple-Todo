import { Router } from "express";
import {
  deleteTodo,
  getSingleTodo,
  getTodos,
  newTodoCreate,
  updateTodo,
} from "../controllers/todo";

const router = Router();

router.post("/create", newTodoCreate);
router.delete("/todos/:id", deleteTodo);
router.get("/todos", getTodos);
router.get("/todos/:id", getSingleTodo);
router.put("/todos/:id", updateTodo);

export default router;
