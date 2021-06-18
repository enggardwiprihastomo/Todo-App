const dark = "#222222"
const white = "#FFFFFF"

const ADD_TASK = "ADD_TASK"
const DELETE_TASK = "DELETE_TASK"
const TOGGLE_MODE = "TOGGLE_MODE"

const priorities: string[] = ["Low", "Medium", "High"]


function setClass(mode: boolean, className: string) {
    return mode ? `${className} ${className}-night` : className
}

export { priorities, setClass, ADD_TASK, DELETE_TASK, TOGGLE_MODE }