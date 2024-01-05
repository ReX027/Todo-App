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
                setTodos(response.data.data);
            })
            .catch((error) => {
                console.error("Couldnot fetch", error);
            });
    }

    // Add a Todo
    const addTodo = async (content1, color1, complete1) => {
        // API Call
        const content = content1;
        let color;
        if (color1) {
            color = color1
        }
        let complete;
        if (complete1) {
            complete = complete1
        }
        // const complete = complete1; 
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
                // console.log(response.data.data, "Added Todo");
                setTodos(Todos.concat(response.data.data));
            })
            .catch((error) => {
                console.error("Couldnot add", error);
            });
    };
    // const deleteTodo = async()
    // Delete a Note
    const deleteTodo = async (id) => {
        // console.log("delete node with"+id);
        const response = await fetch(`${host}/api/v1/todos/deletetodo/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxYzVmZjFmYzM4ZGFiMGMyZTQ2Mjk2In0sImlhdCI6MTY5NjM1ODM4NX0.yN0PvvafcOhTbUKUHFruoOVxmBhv1WeJSvmwOkl9kKw"
            }
        })
        const json = response.json();
        console.log(json);
        const newTodo = Todos.filter((Todo) => { return Todo._id !== id });
        // setNotes(newNote);
        setTodos(newTodo);
    }
    // Edit a Note
    const editTodo = async (id, content, complete) => {
        // API Call
        const response = await fetch(`${host}/api/v1/todos/updatetodo/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxYzVmZjFmYzM4ZGFiMGMyZTQ2Mjk2In0sImlhdCI6MTY5NjM1ODM4NX0.yN0PvvafcOhTbUKUHFruoOVxmBhv1WeJSvmwOkl9kKw"
            },
            body: JSON.stringify({ content, complete }),
        })
        // const json = response.json();
        // Logic to edit in client
        for (let index = 0; index < Todos.length; index++) {
            const element = Todos[index];
            if (element._id === id) {
                element.content = content;
                element.complete = complete;
            }
        }
    }
    return (
        <TodoContext.Provider value={{ Todos, fetchTodo, addTodo, deleteTodo, editTodo }}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoState;