import { useContext, useState } from 'react'
import TodoContext from '../context/Todos/TodoContext';
import './AddTodo.css'
const AddTodo = () => {
    const context = useContext(TodoContext);
    const { addTodo } = context;
    const [todo, settodo] = useState({ content: "", color: "", complete: "" })
    const handleAddTodo = (e) => {
        e.preventDefault();
        addTodo(todo.content, todo.color, todo.complete);
        settodo({ content: "" });
    }
    const OnchangeInput = (e) => {
        settodo({ ...todo, [e.target.name]: e.target.value })
    }
    const handleColorChange = (e) => {
        settodo({ ...todo, color: e.target.value });
    }
    return (
        <div className="todos" >
            <h3>Add a Task</h3>
            <form>
                <div className="todoContent">
                    <input
                        type="text"
                        className="form-control"
                        id="content"
                        name="content"
                        value={todo.content}
                        onChange={OnchangeInput}
                        style={{ color: todo.color === "rgb(37, 37, 37)" ? "white" : "black", backgroundColor: todo.color }}
                    />
                </div>
                <div className="colorDropdown">
                    <select
                        id="color"
                        name="color"
                        value={todo.color}
                        onChange={handleColorChange}
                    >
                        <option value="">select color</option>
                        <option value="#62cb82ce">Green</option>
                        <option value="#62cabcce">sky blue</option>
                        <option value="rgb(37, 37, 37)">Black</option>
                    </select>
                </div>
                <button type="submit" className="btn " onClick={handleAddTodo}>
                    Add Task
                </button>
            </form>
        </div>
    )
}

export default AddTodo