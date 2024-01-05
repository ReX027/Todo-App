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
    return (
        <div className="todos">
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
                    />
                </div>
                <button type="submit" className="btn " onClick={handleAddTodo}>
                    Add Task
                </button>
            </form>
        </div>
    )
}

export default AddTodo