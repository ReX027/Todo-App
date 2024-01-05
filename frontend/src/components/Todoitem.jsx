// import { useContext } from 'react'
// import TodoContext from '../context/Todos/TodoContext';
import './Todoitem.css'

const Todoitem = (props) => {
    // const context = useContext(TodoContext);
    // const { deleteTodo } = context;
    const Todo = props.todo;

    // if (!Todo[0]) {
    //     console.error('Todo is undefined or null.');
    //     return null; // or render a placeholder, return an empty component, or handle it in another way
    // }
    // useEffect(() => {
    //     const tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
    //     tooltips.forEach((tooltip) => new window.bootstrap.Tooltip(tooltip));
    // }, []);
    // const handleDeleteClick = () => {
    //     // Hide the tooltip when the "Delete" icon is clicked
    //     // const deleteIcon = document.querySelector('.fa-circle-minus');
    //     // const tooltip = event.currentTarget._tippy;
    //     // if (tooltip) {
    //     //   tooltip.hide();
    //     // }
    //     const tooltips = document.getElementsByClassName('custom-tooltip');

    //     // Convert the HTMLCollection to an array and iterate through each element
    //     Array.from(tooltips).forEach((tooltip) => {
    //         tooltip.style.display = 'none';
    //     });
    //     deleteTodo(Todo._id);
    // };
    return (
        <>
            <div className="todo-card">
                <div className="card-body">
                    <p className="card-title">{Todo.content}</p>
                </div>
            </div>
        </>
    )
}

export default Todoitem