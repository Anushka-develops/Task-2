import { useState, useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'; // for unique id
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import 'remixicon/fonts/remixicon.css';
import CalendarComponent from './Calendar';

// confirm function use kr skte hai

function App() {

  const[todo, setTodo] = useState("")
  const[todos, setTodos] = useState([])  // [] as it is an array
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);


  useEffect(() => {       // use effect snippet - load all todos
    let todoString = localStorage.getItem("todos")    // agr todo hai to load hoga
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = (params) => {   // save to local storage - ToLS
       
      localStorage.setItem("todos", JSON.stringify(todos))  // sab kch local storage pe save
  }
  const handleEdit = (e,id) => {

    let t = todos.filter(i=>i.id === id)    // edit section mei laane ke liye
    setTodo(t[0].todo)
    // to delete older
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e,id) => {
  
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleAdd = () => {
      setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])  //... -> jitne hai utne rhenge
      setTodo("")   // dobara blank 
      saveToLS()
  }
  const handleChange = (e) => {
      setTodo(e.target.value)
    }
  const handleCheckbox = (e) => {
    let id = e.target.name;   // yha se id mil jaegi
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];  // to change state vrna state render nhi hogi
    newTodos[index].isCompleted = !newTodos[index].isCompleted; 
    setTodos(newTodos);
    saveToLS()
  
    // javascript problem    // iss id pe uska is completed false hai to true aur true hai to false krna hai

  }
  
  
  return (
    <>
    <Navbar />
    <div className="App">
      <CalendarComponent />
    </div>   
    <div className="App">
        <header className="App-header">
          <h1 className='mx-4 font-semibold'>Date: 
          {dateTime.toLocaleDateString()}</h1>
          <h1 className='mx-4 font-semibold'>Time:
          {dateTime.toLocaleTimeString()}</h1>
        </header>
      </div>
      <div className = "mx-3 md:container md:mx-auto my-5 rounded-3xl p-5 bg-sky-100 min-h-[100vh] md:w-1/2">       
        <h1 className = 'font-bold text-center text-3xl'>Todos to Done</h1>
        <h2 className = 'font-bold text-center text-2xl p-2'>All at on place</h2>
        <div className = "addToDo my-5 ">
          <h2 className = 'text-lg font-bold '>Add your To-Do</h2>
          <div className="flex">
          <input onChange = {handleChange} value =  {todo} type="text" className = 'w-2/3 rounded-lg py-1 px-5' placeholder="Add a new task" ></input>
          <button onClick = {handleAdd} disabled = {todo.length <= 3} className = 'bg-sky-300 hover:bg-sky-800 disabled:bg-sky-300 p-3 py-1 text-white rounded-md text-sm font-bold mx-6'><MdAddBox /></button>
          </div>
        </div>
        <div className="h-[1px] bg-slate-900 w-90% my-2 opacity-20 mx-auto "></div>
        <h1 className = 'text-xl font-bold my-4'>Your Todos</h1>
        <div className = "todos">
          {todos.length === 0 && <div className = 'm-5'>!! Plan your day !!</div> }
          {todos.map(item=>{      // store all values as map

          return <div key={item.id} className = "todo flex md:w-1/2 my-3 justify-between">
            <div className = 'flex gap-5'>
            <input name = {item.id} onChange = {handleCheckbox} type = "checkbox" checked = {item.isCompleted} id="" />
            <div className = {item.isCompleted? "line-through" :""}>
            {item.todo}
            </div>
            </div>
            <div className = "buttons flex h-full">
              <button onClick = {(e) => {handleEdit(e, item.id)}}className = 'bg-sky-300 hover:bg-sky-800 p-3 py-1 text-white rounded-md text-sm font-bold mx-2'><FaEdit /></button>
              <button onClick = {(e) => {handleDelete(e, item.id)}} className = 'bg-sky-300 hover:bg-sky-800 p-3 py-1 text-white rounded-md text-sm font-bold mx-2'><MdDeleteSweep /></button>     
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
