import { priorities } from "../../shared"

interface IProps {
    name: string
    value: number
    defaultValue: number
    setState: (value: number) => void
}

function Radio({ name, value, defaultValue, setState }: IProps) {
    return (
        <div>
            <input type="radio" name={name} id={`${name}_${value}`} value={value} checked={value === defaultValue ? true : false} onChange={e => setState(parseInt(e.target.value))} />
            <label htmlFor={`${name}_${value}`}>{priorities[value]}</label>
        </div>
    )
}

export default Radio