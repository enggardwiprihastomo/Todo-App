import { useContext, useState } from "react";
import { FaSortAmountDownAlt, FaSortAmountUpAlt, FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import { Todo } from "../pages";
import { priorities, setClass } from "../shared"
import Select from "./select";

interface ISort {
    sortBy?: string
    asc?: boolean
}

function Table() {
    const { mode, todos, deleteTodo, updateTodo } = useContext(Todo)
    const [paginate, setPaginate] = useState<number>(5)
    const totalPage: number = Math.ceil(todos.length / paginate)
    const [page, setPage] = useState<number>(1)
    const [sortedTodo, setSortedTodo] = useState<ISort | null>(null)

    function deleteHandler(id: number) {
        deleteTodo(id)
        if (todos.length % paginate === 1 && page !== 1) {
            setPage(prev => prev - 1)
        }
    }

    function handleNextPage() {
        const nextPage = page + 1
        setPage(nextPage)
    }

    function handlePrevPage() {
        const prevPage = page - 1
        setPage(prevPage)
    }

    function sortTodo(sortBy: string) {
        if (sortedTodo && sortedTodo.asc) {
            setSortedTodo({
                sortBy,
                asc: false
            })
            todos.sort((a, b) => a[sortBy] < b[sortBy] ? 1 : -1)
        }
        else {
            setSortedTodo({
                sortBy,
                asc: true
            })
            todos.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1)
        }
    }

    return (
        <div className="table">
            <div className="table-container">
                <div className="table-header">
                    <div onClick={() => sortTodo("name")}>
                        {sortedTodo && sortedTodo.sortBy === "name" && (
                            <button>
                                {sortedTodo.asc ? <FaSortAmountDownAlt fill="#FFFFFF" /> : <FaSortAmountUpAlt fill="#FFFFFF" />}
                            </button>
                        )}
                        <span>Task name</span>
                    </div>
                    <div onClick={() => sortTodo("priority")}>
                        {sortedTodo && sortedTodo.sortBy === "priority" && (
                            <button>
                                {sortedTodo.asc ? <FaSortAmountDownAlt fill="#FFFFFF" /> : <FaSortAmountUpAlt fill="#FFFFFF" />}
                            </button>
                        )}
                        <span>Priority</span>
                    </div>
                    <div onClick={() => sortTodo("status")}>
                        {sortedTodo && sortedTodo.sortBy === "status" && (
                            <button>
                                {sortedTodo.asc ? <FaSortAmountDownAlt fill="#FFFFFF" /> : <FaSortAmountUpAlt fill="#FFFFFF" />}
                            </button>
                        )}
                        <span>Done</span>
                    </div>
                </div>
                <div className={setClass(mode, "table-body")}>
                    {todos.slice((page - 1) * paginate, page * paginate).map(todo => (
                        <div key={todo.id}>
                            <div className={todo.status ? "table-body-todo" : null} style={mode ? { backgroundColor: "#222222" } : null}>
                                <span>{todo.name}</span>
                                <span>{priorities[todo.priority]}</span>
                                <span>
                                    <input type="checkbox" id={todo.id.toString()} checked={todo.status} onChange={e => updateTodo(todo.id, e.target.checked)} className="checklist" />
                                    <label htmlFor={todo.id.toString()}></label>
                                </span>
                            </div>
                            <button className="btn-delete" onClick={() => deleteHandler(todo.id)}>Delete</button>
                        </div>
                    ))}
                </div>
                <div className={setClass(mode, "table-footer")}>
                    <p>Rows per page</p>
                    <Select options={[5, 10, 15]} setState={setPaginate} />
                    <button disabled={page > 1 ? false : true} onClick={handlePrevPage}>
                        <FaAngleDoubleLeft />
                    </button>
                    <p>Showing row <b>{(page - 1) * paginate + 1} - {page === totalPage ? todos.length : page * paginate}</b></p>
                    <button disabled={page < totalPage ? false : true} onClick={handleNextPage}>
                        <FaAngleDoubleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Table