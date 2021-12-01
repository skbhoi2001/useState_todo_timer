import styles from "./Todo.module.css"
function TodoList({id,title,status,handleDelete,handleToogle}){
    console.log(status)
    return(
        <div >
            <div className={styles.todoOne}>
            <h3>{title}</h3>
            <p>{status}</p>
            <button onClick={()=>{handleToogle(id,status)}}>Toogle</button>
            <button onClick={()=>{handleDelete(id)}}>Delete</button>
            </div>
           
        </div>
    )
}

export {TodoList}