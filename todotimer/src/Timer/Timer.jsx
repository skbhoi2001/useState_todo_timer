import { useEffect, useState } from "react"

function Timer({initial,final}){
    const [time,setTime] = useState(initial)


    useEffect(()=>{
        const id = setInterval(()=>{
            setTime((prev)=>{
                if(prev === final-1){
                    clearInterval(id)
                    alert("Over")
                    setTime("Refresh")
                }
                return prev+1
            })
        },1000)
        return ()=> clearInterval(id)
    },[final])
    return(
        <div>
            <div> Initial::{initial} Final::{final} Timer::{time}</div>
        </div>
    )
}

export {Timer}