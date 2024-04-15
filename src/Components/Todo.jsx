import { useEffect, useRef, useState } from 'react'
import './CSS/Todo.css'
import TodoItems from './TodoItems';

let count=0;
const Todo = () => {


    // usestate variable to store todo list data
    const [todos,setTodos]=useState([]);
    const inputRef=useRef(null);
    
    // function for add button
    const add=()=>{
        setTodos([...todos,{
            no:count++,
            text:inputRef.current.value,
            display:""}]);
        inputRef.current.value='';
        // no is alwyas 0 to fix it we use count
        localStorage.setItem("todos_count",count);
    }


    // to save local stroage
    useEffect(()=>{
        // to covert string to json use json.parse
        setTodos(JSON.parse(localStorage.getItem("todos")));
        // no is alwyas was 0 Hence we fix by below
        count=localStorage.getItem("todos_count");
    },[])


    // to display updated todo list
    useEffect(()=>{
        
        setTimeout(()=>{
            // create local storage to store data
        localStorage.setItem("todos",JSON.stringify(todos));
        },100)
    },[todos])


  return (
    <div className='todo'>
      <div className="todo-header"> To-Do List</div>
      <div className="todo-add">
        <input ref={inputRef} type="text" placeholder='Add your task' className='todo-input' />
        <div onClick={()=>{add() }} className="todo-add-btn">ADD</div>
      </div>
      <div className="todo-list">
        {
            todos.map((item,index)=>{
                return <TodoItems key={index} setTodos={setTodos}  no={item.no}  display={item.display} text={item.text}/>
            })
        }
      </div>
    </div>
  )
}

export default Todo
