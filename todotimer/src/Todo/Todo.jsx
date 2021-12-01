import { useEffect, useState } from "react"
import { TodoInput } from "./TodoInput"
import {v4 as uuid} from 'uuid'
import { TodoList } from "./TodoList"
function Todo(){
    const [todo,setTodo] = useState([])
    const [toogle,setToogle] = useState(false)

    useEffect(()=>{
        fetch(`http://localhost:3000/posts`)
        .then(res => res.json())
        .then(res => {
            setTodo([...res])
        })
        .catch(err=>{
            console.log(err)
        })
    },[toogle])
    
    const handleChange= async(title)=>{
        const payload={
            id:uuid(),
            title:title,
            status:"false"
        }
        setTodo([...todo,payload]);
        await fetch("http://localhost:3000/posts",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    }
    const handleDelete = async (id)=>{
        try{
            await fetch(`http://localhost:3000/posts/${id}`,{
            method:'DELETE',
        })
        }
        catch(err){
            console.log(err)
        }
        setTodo(todo.filter((item)=>item.id !==id));
    }
    const handleToogle =async (id,status)=>{
        try{
            var value = status==="false"? "true": "false"
            var pay = {
                status: value
            }
            const updatedTodos = todo.map((item)=>
            item.id===id ? {...item, status: (item.status==="true")?("false"):"true"}: item
            );
            await fetch(`http://localhost:3000/posts/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pay)
            })
            
            setTodo(updatedTodos);
            setToogle(toogle===true? false: true)  
            
        }
        catch(err){
            console.log(err)
        }
       
    }
    return(
        <div>
            <TodoInput onTask={handleChange}/>
            {
              todo.map((todos) => {
                    return <TodoList
                        key={todos.id}
                        id={todos.id}
                        title={todos.title}
                        status={todos.status}
                        handleDelete={handleDelete}
                        handleToogle={handleToogle}
                    />
                })
            }
        </div>
    )
}

export {Todo}