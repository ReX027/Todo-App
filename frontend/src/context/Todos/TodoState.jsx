import { useState } from "react";
import TodoContext from "./TodoContext";
import axios from "axios";

const TodoState = (props) => {
    const host = "http://localhost:4000/api/v2/todos"
    const TodosInitial = []
    const [Todos, setTodos] = useState(TodosInitial);
    // Fetch all Todos
    const fetchTodo = async () => {
        await axios
            .get(`${host}/fetchalltodos`, {
                withCredentials: true
            })
            .then((response) => {
                setTodos(response.data.data.reverse());
            })
            .catch((error) => {
                console.error("Couldnot fetch", error);
            });
    }

    // Add a Todo
    const addTodo = async (content1, color1, complete1) => {
        const content = content1;
        let color;
        if (color1) {
            color = color1
        }
        let complete;
        if (complete1) {
            complete = complete1
        }
        await axios
            .post(
                `${host}/addtodo`,
                {
                    content,
                    color,
                    complete
                },
                {
                    withCredentials: true,
                }
            )
            .then((response) => {
                setTodos([response.data.data, ...Todos]);
            })
            .catch((error) => {
                console.error("Couldnot add", error);
            });
    };
    // Delete a Note
    const deleteTodo = async (id) => {
        try {
            const response = await axios.delete(`${host}/deletetodo/${id}`, {
                withCredentials: true,
            });

            if (response.data.success) {
                // Successfully deleted, you can fetch the updated todos
                fetchTodo();
            } else {
                console.error(`Failed to delete todo with ID ${id}`);
            }
        } catch (error) {
            console.error("Error during deleteTodo:", error);
        }
    };
    // Edit a Note
    const editTodo = async (id, content1, complete1, color1) => {
        let content;
        if (content1) {
            content = content1;
        }
        let color;
        if (color1) {
            color = color1
        }
        let complete;
        if (complete1) {
            complete = complete1
        }
        try {
            // API Call
            const response = await axios.patch(
                `${host}/updatetodo/${id}`,
                { content, complete, color },
                {
                    withCredentials: true
                }
            );
            if (response.data.success) {
                fetchTodo();
                // console.log(`Todo with ID ${id} updated successfully`);
            } else {
                console.error(`Failed to update todo with ID ${id}`);
            }
        } catch (error) {
            console.error("Error during editTodo:", error);
        }
    };

    return (
        <TodoContext.Provider value={{ Todos, fetchTodo, addTodo, deleteTodo, editTodo }}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoState;