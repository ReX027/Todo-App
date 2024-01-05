import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Todo } from "../models/todo.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const fetchTodo = asynchandler(async (req, res) => {
    const todos = await Todo.find({ createdBy: req.user.id });
    if (!todos) {
        throw new ApiError(400, "You don't have todos, please create one")
    }
    return res.status(200).json(
        new ApiResponse(200, todos, "Todo's are fetched successfully")
    )
})

const addTodo = asynchandler(async (req, res) => {
    const { content, complete, color } = req.body

    if (content === "") {
        throw new ApiError(400, "Enter a valid content")
    }
    if (color === "") {

    }
    if (complete === "") {

    }
    const createdTodo = await Todo.create({
        createdBy: req.user._id,
        content,
        complete,
        color
    })

    if (!createdTodo) {
        throw new ApiError(500, "Something went wrong while adding todo")
    }

    return res.status(201).json(
        new ApiResponse(200, createdTodo, "Todo is added successfully")
    )

})

const deleteTodo = asynchandler(async (req, res) => {
    const id = req.params.id;
    try {
        const todo = await Todo.findOne({ _id: id, createdBy: req.user.id });

        if (!todo) {
            throw new ApiError(400, "Unauthorized request or Todo not found");
        }
        const deletedTodo = await Todo.findByIdAndDelete(id);
        return res.status(200).json(
            new ApiResponse(200, deletedTodo, "Todo deleted successfully")
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, null, "Internal Server Error")
        );
    }
})

const updateTodo = asynchandler(async (req, res) => {
    const { content, complete, color } = req.body
    try {
        if (content.trim() === "") {
            throw new ApiError(400, "Content cannot be empty")
        }
        const id = req.params.id;
        const todo = await Todo.findOne({ _id: id, createdBy: req.user.id });

        if (!todo) {
            throw new ApiError(400, "Unauthorized request or Todo not found");
        }
        const updatedTodo = await Todo.findByIdAndUpdate(id, {
            $set: {
                content,
                complete,
                color
            }
        },
            { new: true })
        return res.status(200).json(
            new ApiResponse(200, updatedTodo, "Todo updated successfully")
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, null, "Internal Server Error")
        );
    }

})

export { fetchTodo, addTodo, deleteTodo, updateTodo }