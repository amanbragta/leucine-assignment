import express from "express";
import {
  deleteTodo,
  getTodos,
  postTodos,
  updateTodos,
} from "../controllers/todos.controller.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", postTodos);
router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodos);

export default router;
