import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";


export default function TodoItem({todo}: {
    todo: { id: string; title: string };
  }) {
    const dispatch = useDispatch();
    return (
        <li key={todo.id} className="list-group-item">
        <div className= "flex-row-reverse row align-items-center">
        <button className="btn btn-danger col-auto m-2" onClick={() => dispatch(deleteTodo(todo.id))}
            id="wd-delete-todo-click">
            Delete </button>
        <button className="btn btn-primary col-auto m-2" onClick={() => dispatch(setTodo(todo))}
            id="wd-set-todo-click">
            Edit </button>
            <div className="col ms-auto m-2">{todo.title}</div>

        </div>
    </li>
        );}