import { useContext } from "react"
import { Todo } from "../pages"

function Switch() {
    const { mode, changeMode } = useContext(Todo)

    return (
        <div>
            <input type="checkbox" id="switch" className="switch" checked={mode} onChange={changeMode} />
            <label htmlFor="switch" />
        </div>
    )
}

export default Switch