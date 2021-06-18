import Sidebar from "./components/sidebar";
import Content from "./components/content";
import { useContext } from "react";
import NoData from "./components/noData";
import { Todo } from ".";
import Switch from "./components/switch";
import { setClass } from "../shared";

function Desktop() {
    const { mode, todos } = useContext(Todo)

    return (
        <main className="container-desktop">
            <Sidebar />
            <div className="content-desktop">
                <div className={setClass(mode, "switcher")}>
                    <Switch />
                </div>
                {todos.length ? <Content /> : <NoData />}
            </div>
        </main>
    )
}

export default Desktop