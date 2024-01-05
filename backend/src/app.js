import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser({ limit: "4KB" }))
app.get('/', (req, res) => {
    res.send("Hi welcome to my server");
})

// routes import
import userRouter from "./routes/user.route.js"
import todoRouter from "./routes/todo.route.js"

// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v2/todos", todoRouter)

export { app }