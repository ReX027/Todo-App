import { useContext, useState } from 'react'
import TodoContext from '../context/Todos/TodoContext';
import './Todoitem.css'
import CircleUpdate from './CircleUpdate';

const Todoitem = (props) => {
    const context = useContext(TodoContext);
    const { deleteTodo, editTodo } = context;
    const Todo = props.todo;
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(Todo.content);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleUpdateClick = () => {
        editTodo(Todo._id, updatedContent)
        setIsEditing(false);
    };
    const handleDeleteClick = () => {
        deleteTodo(Todo._id);
    };
    return (
        <>
            <div className={`todo-card ${Todo.complete ? 'completed' : ''}`} style={{ backgroundColor: Todo.color }}>
                <div className="card-body">
                    {isEditing ? (
                        <>
                            <input
                                style={{
                                    color: Todo.color === "rgb(37, 37, 37)" ? "white" : "black",
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '8px',
                                    height: '45px',
                                    width: '98%',
                                }}
                                type="text"
                                value={updatedContent}
                                onChange={(e) => setUpdatedContent(e.target.value)}
                            />
                            <button type="submit" onClick={handleUpdateClick} className="btn3">
                                Update
                            </button>
                        </>
                    ) : (
                        <>
                            <p className={`card-title ${Todo.complete ? 'completed' : ''}`} style={{ color: Todo.color === "rgb(37, 37, 37)" ? "white" : "black", backgroundColor: Todo.complete === "true" ? "red" : "", position: 'relative' }}>{Todo.content}
                                {Todo.complete && (
                                    <span
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: 0,
                                            right: 0,
                                            height: '2px',
                                            background: 'red',
                                            transform: 'translateY(-50%)',
                                            width: `${Todo.content.length}ch`
                                        }}
                                    ></span>
                                )}
                            </p>
                            <button type="submit" onClick={handleDeleteClick} className="btn2">
                                Delete
                            </button>
                            {!Todo.complete && (<button type="submit" onClick={handleEditClick} className="btn3">
                                Edit
                            </button>)}
                            <CircleUpdate todo={Todo} />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Todoitem