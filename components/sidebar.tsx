import { useContext, useState } from "react"
import { priorities, setClass } from "../shared"
import { Todo } from "../pages/index"
import Radio from "./radio"

function Sidebar({ style }: any) {

    const { mode, saveTodo, refName } = useContext(Todo)
    const [name, setName] = useState<string>("")
    const [priority, setPriority] = useState<number>(1)
    const [status, setStatus] = useState<boolean>(false)
    const [errorState, setErrorState] = useState<boolean>(false)

    function nameHandler(e) {
        const updatedName: string = e.target.value
        if (updatedName) {
            setErrorState(false)
        }
        setName(updatedName)

    }

    function submitHandler() {
        if (!name) {
            setErrorState(true)
            refName.current.focus()
        }
        else {
            saveTodo({
                id: Date.now(),
                name,
                priority,
                status
            })
            setName("")
            setPriority(1)
            setStatus(false)
        }
    }

    function handleCheckbox() {
        setStatus(prev => !prev)
    }

    return (
        <section className={setClass(mode, "sidebar")} style={style}>
            <div className={setClass(mode, "title")}>
                <h2><p>TODO</p> List</h2>
                <h4>Plan your activities and be productive</h4>
            </div>
            <div className={setClass(mode, "inputs")}>
                <div>
                    <label htmlFor="name">Task name <span className="required">*</span></label>
                    <input ref={refName} type="text" id="name" onChange={nameHandler} value={name} />
                    {errorState && (<p>This field can't be empty</p>)}
                </div>
                <div>
                    <p>Priority</p>
                    <div className="radio">
                        {priorities.map((radio, idx) => <Radio key={`radio-${idx}`} setState={setPriority} name="priority" value={idx} defaultValue={priority} />)}
                    </div>
                </div>
                <div>
                    <p>Status</p>
                    <div>
                        <input type="checkbox" name="status" id="status" onChange={handleCheckbox} checked={status} />
                        <label htmlFor="status">{status ? "Done" : "Undone"}</label>
                    </div>
                </div>
                <div>
                    <button className="btn-add" onClick={submitHandler}>Add</button>
                </div>
            </div>
        </section>
    )
}

export default Sidebar