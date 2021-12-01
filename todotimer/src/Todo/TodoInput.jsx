import { useState } from "react"

function TodoInput({onTask}){
    const [text,setText] = useState("")
    const handleChange=(e)=>{
        setText(e.target.value)
    }

    const handleClick = ()=>{
        onTask(text)
        setText("")
    }
    return(
        <div>
            <input type="text" value={text} onChange={handleChange} placeholder="Add Something" />
            <button onClick={handleClick}>Add</button>
        </div>
    )
}

export {TodoInput}