import { MutableRefObject, useRef } from "react";
import { createContext, useEffect, useState } from "react";

import Desktop from "./index.desktop";
import Mobile from "./index.mobile";
import Tablet from "./index.tablet";

export interface ITodo {
  id: number
  name: string
  priority: number
  status: boolean
}

interface ContextType {
  mode: boolean
  todos: ITodo[]
  saveTodo: (todo: ITodo) => void
  deleteTodo: (id: Number) => void
  updateTodo: (id: Number, status: boolean) => void
  changeMode: () => void
  refName: any
}

const Todo = createContext<ContextType | null>(null)

function App() {
  const [windowWidth, setWindowWidth] = useState(0)
  const [mode, setMode] = useState<boolean>(false)
  const [todos, setTodos] = useState<ITodo[]>([])
  const refName = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const getTodo = localStorage.getItem("todo")
    if (getTodo) {
      setTodos(JSON.parse(getTodo))
    }
  }, [])

  function updateTodo(id: number, status: boolean) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.status = status
      }
      return todo
    })
    localStorage.setItem("todo", JSON.stringify(updatedTodos))
    setTodos(updatedTodos)
  }

  function saveTodo(todo: ITodo) {
    const newTodos = [todo, ...todos]
    localStorage.setItem("todo", JSON.stringify(newTodos))
    setTodos([todo, ...todos])
  }

  function deleteTodo(id: number) {
    const newTodos = todos.filter(todo => todo.id != id)
    localStorage.setItem("todo", JSON.stringify(newTodos))
    setTodos(newTodos)
  }

  function changeMode() {
    setMode(prev => !prev)
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    function windowSizeHandler() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", windowSizeHandler)

    return () => {
      window.removeEventListener("resize", windowSizeHandler)
    }
  }, [])

  let screen: JSX.Element

  if (windowWidth <= 480) {
    screen = <Mobile />
  }
  else if (windowWidth > 480 && windowWidth <= 768) {
    screen = <Tablet />
  }
  else {
    screen = <Desktop />
  }

  return (
    <Todo.Provider value={{
      mode, todos, changeMode, updateTodo, deleteTodo, saveTodo, refName
    }}>
      {screen}
    </Todo.Provider>
  )
}

export default App
export { Todo }