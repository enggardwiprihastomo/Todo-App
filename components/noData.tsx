import { useContext } from "react"
import { Todo } from "../pages"
import { setClass } from "../shared"

function NoData() {
    const { refName, mode } = useContext(Todo)

    function focusHandler() {
        refName.current.focus()
    }

    return (
        <section className={setClass(mode, "no-data")}>
            <img src="./il-no-list.svg" alt="No Data" />
            <p>Ooops, looks like you have no task to do</p>
            <p><button onClick={focusHandler}>Add Task</button> to remind or check what to do and you have done</p>
        </section>
    )
}

export default NoData