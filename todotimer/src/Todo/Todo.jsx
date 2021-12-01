import { useEffect, useState } from "react"
import { TodoInput } from "./TodoInput"
import {v4 as uuid} from 'uuid'
import { TodoList } from "./TodoList"
function Todo(){
    const [todo,setTodo] = useState([])
    const [toogle,setToogle] = useState(false)
    const [page,setPage] = useState(1)

    useEffect(()=>{
        fetch(`http://localhost:3000/posts?_limit=3&_page=${page}`)
        .then(res => res.json())
        .then(res => {
            setTodo([...res])
        })
        .catch(err=>{
            console.log(err)
        })
    },[toogle,page])
    
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
    const handlePage=(e)=>{
            var val = e.target.name
            if(val === "PREV"){
                if(page === 1){
                    setPage(1)
                }
                else{
                    setPage((prev)=>prev-1)
                }
            }
            else if(val === "NEXT"){
                todo.length<3?setPage((prev)=>prev):setPage((prev)=>prev+1)
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

            <button name ="PREV" onClick={(e)=>{handlePage(e)}}>Prev</button>
            <button NAME="NEXT" onClick={(e)=>{handlePage(e)}}>Next</button>
        </div>
    )
}

export {Todo}