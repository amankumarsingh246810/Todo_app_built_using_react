import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
   const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
   
 
  }, [])
  

   const saveToLS = (params) => {
     localStorage.setItem("todos", JSON.stringify(todos))
   }
   
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  const handleEdit = (e,id)=>{
   let t = todos.filter(i=>i.id=== id)
   setTodo(t[0].todo)
   
   let newTodos = todos.filter(item=>{
    return item.id!== id
   })
  
   setTodos(newTodos)
   saveToLS()
  
  }
  const handleDelete = (e,id)=>{
   
    
    
     let newTodos = todos.filter(item=>{
      return item.id!== id
     })
    
     setTodos(newTodos)
     saveToLS()
  }
  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    console.log(todos)
    saveToLS()
  }
  const handleChange = (e)=>{
    
    setTodo(e.target.value)
  }
 const  handleCheckbox =(e) => {
  console.log(e, e.target)
   let id = e.target.name;
   let index = todos.findIndex(item=>{
    return item.id==id;
   })
   console.log(index)
   let newTodos = [...todos];
   newTodos[index].isCompleted = !newTodos[index].isCompleted;
   setTodos(newTodos)
   console.log(newTodos, todos)
   saveToLS()
 }
 

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-300 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-xl'>iTask - Manage all your todos </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h1 className='text-lg font-bold'>Add a Todo</h1>
          <input onChange={handleChange} value={todo} type='text w-80' className='w-full rounded-lg px-5 py-2' />
          <button onClick={handleAdd} disabled={todo.length<1} className='bg-violet-400 hover:bg-violet-950 p-2 py-1 font-bold text-white rounded-md  disabled:bg-violet-800'>Save</button>
        </div>
        <input onChange={toggleFinished} type='checkbox' checked={showFinished}/> show Finished
        <h1 className='text-xl font-bold'>Your Todos</h1>
        <div className="todos">
          {todos.length===0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item=>{

          return (showFinished || !item.isCompleted) &&<div key={item.id} className="todo flex md:w-1/2 my-3 justify-between">
            <div className='flex gap-5'>
           <input name={item.id} onchange={handleCheckbox} type="checkbox" checked={item.isCompleted}  id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}
              </div> </div>
            <div className="buttons flex h-full">
             <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-400 hover:bg-violet-950 p-2 py-1 font-bold text-white rounded-md mx-1'><FaEdit /></button>
             <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-400 hover:bg-violet-950 p-2 py-1 font-bold text-white rounded-md mx-1'><MdDeleteSweep /></button>
            </div>
          </div>
           })}
        </div>
      </div>

    </>
  )
}

export default App




