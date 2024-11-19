import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
        <li className="list-group-item">
            <div className="flex-row-reverse row align-items-center">
                <button className="btn btn-success col-auto m-2" onClick={() => dispatch(addTodo(todo))}
                    id="wd-add-todo-click">Add</button>
                <button className="btn btn-warning col-auto m-2" onClick={() => dispatch(updateTodo(todo))}
                    id="wd-update-todo-click">
                    Update </button>


                <input className="col ms-auto m-2" value={todo.title}
                    onChange={(e) =>
                        dispatch(setTodo({
                            ...todo,
                            title: e.target.value
                        }))
                    }
                />
            </div>
        </li>
    );
}
