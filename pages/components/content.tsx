import { useContext } from "react"
import { setClass } from "../../shared"
import { Todo } from "../index"
import Table from "./table"

function Content() {
    const { mode } = useContext(Todo)

    return (
        <section className={setClass(mode, "content")}>
            <Table />
        </section >
    )
}

export default Content