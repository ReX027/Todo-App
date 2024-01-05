import { useContext, useEffect } from 'react'
import TodoContext from '../context/Todos/TodoContext';
import AddTodo from './AddTodo';
import Todoitem from './Todoitem';
import './Todos.css'
const Todos = () => {
    const context = useContext(TodoContext);
    const { Todos, fetchTodo } = context;
    useEffect(() => {
        fetchTodo()
    }, [])

    return (
        <>
            <AddTodo />
            <div className="todos">
                <h3>My Todos</h3>
                {Todos.map((Todo) => {
                    console.log(Todo._id, "yooo");
                    return <Todoitem key={Todo._id} todo={Todo} />;
                })}
            </div>
        </>
    )
}

export default Todos