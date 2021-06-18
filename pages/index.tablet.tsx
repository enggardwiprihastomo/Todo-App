import { useContext } from "react"
import { FaTh } from "react-icons/fa";
import { Todo } from "."
import Sidebar from "./components/sidebar";
import Content from "./components/content";
import NoData from "./components/noData";
import Switch from "./components/switch";
import { useState } from "react";
import { setClass } from "../shared";

function Tablet() {
    const { mode, todos, refName } = useContext(Todo)
    const [active, setActive] = useState<boolean>(false)
    const [style, setStyle] = useState<object>({ display: "none" })

    function menuHandler() {
        setActive(prev => !prev)
        if (!active) {
            Promise.resolve(setStyle({ display: "block" })).then(() => refName.current.focus())
        }
        else {
            setStyle({ display: "none" })
        }
    }

    return (
        <main className="container-tablet">
            <div className={setClass(mode, "switcher-not-desktop")}>
                <div className={setClass(mode, "container-tablet-menu")}>
                    <button onClick={menuHandler}>
                        <FaTh />
                    </button>
                    <Sidebar style={style} />
                </div >
                <div>
                    <Switch />
                </div>
            </div>
            {todos.length ? <Content /> : <NoData />}
        </main >
    )
}

export default Tablet