import { useContext, useState } from 'react'
import TodoContext from '../context/Todos/TodoContext';
import './AddTodo.css'
const AddTodo = () => {
    const context = useContext(TodoContext);
    const { addTodo } = context;
    const [todo, settodo] = useState({ content: "", complete: "", color: "" })
    const handleAddNote = (e) => {
        e.preventDefault();
        addTodo(todo.content, todo.complete, todo.color);
    }
    const OnchangeInput = (e) => {
        settodo({ ...todo, [e.target.name]: e.target.value })
        console.log(e.target.value);
    }
    return (
        <div className="todos">
            <h3>Add a Task</h3>
            <form>
                <div className="todoContent">
                    {/* <label htmlFor="title" className="form-label">Title</label> */}
                    <input type="text" className="form-control" id="title" name="title" onChange={OnchangeInput} />
                </div>
                {/* <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" />
                </div> */}
                <button type="submit" className="btn" onClick={handleAddNote}>Add Task</button>
            </form>
        </div>
    )
}

export default AddTodo