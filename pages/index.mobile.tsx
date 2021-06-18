import { useState, useContext, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Todo } from ".";
import { priorities, setClass } from "../shared";
import NoData from "./components/noData";
import Select from "./components/select";
import Sidebar from "./components/sidebar";
import Switch from "./components/switch";

function Mobile() {
    const { todos, mode, deleteTodo, updateTodo, refName } = useContext(Todo)

    const [active, setActive] = useState<boolean>(false)
    const [style, setStyle] = useState<object>({ display: "none" })

    const sortOptions = ["Default", "Name", "Priority", "Status"]

    function menuHandler() {
        setActive(prev => !prev)
        if (!active) {
            Promise.resolve(setStyle({ display: "flex" })).then(() => refName.current.focus())
        }
        else {
            setStyle({ display: "none" })
        }
    }

    return (
        <main className={setClass(mode, "container-mobile")}>
            <div className={setClass(mode, "switcher-not-desktop")}>
                <div>
                    <div className={setClass(mode, "title")}>
                        <h2><p>TODO</p> List</h2>
                        <h4>Plan your activities and be productive</h4>
                    </div>
                </div>
                <Switch />
            </div>
            {todos.length ? (
                <div className={setClass(mode, "content-mobile")}>
                    <div className={setClass(mode, "sort-mobile")}>
                        <p>Sort by</p>
                        <Select options={sortOptions} />
                    </div>
                    <div className="mobile-list-wrapper">
                        {todos.map(todo => (
                            <div key={todo.id}>
                                <span>
                                    <input type="checkbox" id={`mobile-list-${todo.id}`} checked={todo.status} onChange={e => updateTodo(todo.id, e.target.checked)} />
                                    <label htmlFor={`mobile-list-${todo.id}`}>{todo.status ? "Done" : "Undone"}</label>
                                </span>
                                <span>
                                    <p>Task name</p><p>{todo.name}</p>
                                </span>
                                <span>
                                    <p>Priority</p><p>{priorities[todo.priority]}</p>
                                </span>
                                <button className="btn-delete" onClick={() => deleteTodo(todo.id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                    <span>
                        <p>Showing row <b>1 - {todos.length}</b></p>
                    </span>
                </div>
            ) : <NoData />}
            <button className="btn-add" onClick={menuHandler}>
                <FaPlus />
            </button>
            <Sidebar style={style} />
        </main>
    )
}

export default Mobile