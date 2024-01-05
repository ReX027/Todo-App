import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { fetchTodo, addTodo, deleteTodo, updateTodo } from "../controllers/todo.controller.js";
const router = Router()

router.route("/fetchalltodos").get(verifyJWT, fetchTodo)
router.route("/addtodo").post(verifyJWT, addTodo)
router.route("/deletetodo/:id").delete(verifyJWT, deleteTodo)
router.route("/updatetodo/:id").patch(verifyJWT, updateTodo)

export default router