import { useEffect } from "react";
import { useContext } from "react";
import { useRef, useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { Todo } from "..";
import { setClass } from "../../shared";

interface IProps {
    options: number[] | string[]
    setState?: (value: any) => void
}

function Select({ options, setState }: IProps) {
    const { mode, todos } = useContext(Todo)
    const [active, setActive] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState<number | string>(options[0])
    const refOption = useRef<HTMLDivElement>()
    const refSelect = useRef<HTMLDivElement>()

    useEffect(() => {
        const calculateOffset: number = (window.innerHeight - refSelect.current.offsetTop) - (refOption.current.offsetTop + refOption.current.offsetHeight)
        if (calculateOffset <= 0) {
            refOption.current.style.bottom = `${refSelect.current.offsetHeight.toString()}px`
        }
    })

    function handleSelect(option) {
        setActive(prev => !prev)
        setSelectedOption(option)
        if (setState) {
            setState(option)
        }

        if (option !== "Default" && typeof option === "string") {
            todos.sort((a, b) => a[option.toLowerCase()] > b[option.toLowerCase()] ? 1 : -1)
        }
    }

    return (
        <div className={setClass(mode, "select")} ref={refSelect}>
            <div onClick={() => setActive(prev => !prev)}>
                <p>{selectedOption}</p>
                <span>
                    {active ? <FaAngleUp size={14} /> : <FaAngleDown size={14} />}
                </span>
            </div>
            <div ref={refOption} className={active ? "select-active" : "select-inactive"}>
                {options.map((option, idx) => {
                    const styles = option === selectedOption ? "option option-active" : "option"
                    return (
                        <p key={`option-${idx}`} className={styles} onClick={() => handleSelect(option)}>{option}</p>
                    )
                })}
            </div>
        </div>
    )
}

export default Select