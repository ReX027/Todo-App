import { useContext } from 'react'
import TodoContext from '../context/Todos/TodoContext';
import "./CircleUpdate.css";

const CircleUpdate = (props) => {
    const context = useContext(TodoContext);
    const { editTodo } = context;
    const Todo = props.todo;
    const handleComplete = async () => {
        editTodo(Todo._id, Todo.content, Todo.complete = "true");
    }
    return (
        <div className={`circle-container ${Todo.complete ? 'completed' : ''}`}>
            <div className="circle">
                <div className="tick" onClick={handleComplete}>

                </div>
            </div>
        </div>
    );
};

export default CircleUpdate;