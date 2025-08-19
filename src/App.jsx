import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

    const handleShowAll = () => setshowFinished(true);
    const handleShowCompleted = () => setshowFinished(false);

    window.addEventListener('showAll', handleShowAll);
    window.addEventListener('showCompleted', handleShowCompleted);

    return () => {
      window.removeEventListener('showAll', handleShowAll);
      window.removeEventListener('showCompleted', handleShowCompleted);
    };
  }, [])

  const storeLocal = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    setTodos([...todos, {
      id: uuidv4(),
      todo, isCompleted: false
    }])
    setTodo("")
    storeLocal()
  }

  const handleEdit = (id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos)
    storeLocal()
  }

  const handleDelete = (id) => {
    let newTodos = todos.filter(i => {
      return i.id !== id
    })
    setTodos(newTodos)
    storeLocal()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    storeLocal()
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  return (
    <>
      <div>
        <Navbar />
        <div className="container relative bg-black border-white border-2 border-opacity-15 rounded-xl w-[95%] md:w-4/5 lg:w-3/4 min-h-screen mx-auto my-8 p-4 sm:p-6">

          <div className="add relative flex flex-col sm:flex-row items-center justify-center gap-4 w-full my-4 p-4">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Add a new task..."
              className="relative bg-slate-300 w-full sm:w-2/3 px-4 py-3 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 2}
              className="relative bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all px-8 py-3 text-white font-semibold rounded-md whitespace-nowrap w-full sm:w-auto"
            >
              Add Task
            </button>
          </div>

          <div className="todos bg-slate-50 w-full rounded-lg p-4 sm:p-6 min-h-[73vh] overflow-y-auto shadow-md">

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-inherit">
              <h1 className='font-bold text-xl sm:text-2xl md:text-3xl bg-inherit text-gray-800'>
                {showFinished ? 'All Tasks' : 'Completed Tasks'}
              </h1>
            </div>



            {todos.length === 0 && (
              <div className='text-xl text-green-700 m-5 bg-inherit font-bold text-center'>
                NO Task In List
              </div>
            )}
            {todos
              .filter(item => showFinished ? true : item.isCompleted)
              .map((item, index) => {
                return (
                <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 mb-4 border-2 border-[#32064A] rounded-lg bg-[#56a0d3] gap-4 hover:shadow-lg transition-all transform hover:-translate-y-1">
                  <div className="flex items-center gap-4 w-full sm:w-auto bg-inherit">
                    <input
                      name={item.id}
                      onClick={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      className="w-6 h-6 cursor-pointer rounded-md transition-all hover:scale-110"
                    />
                    <div className={`bg-inherit text-base sm:text-lg md:text-xl text-white font-medium break-all ${item.isCompleted ? "line-through opacity-70" : ""}`}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex gap-3 bg-inherit w-full sm:w-auto justify-center sm:justify-end mt-3 sm:mt-0">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className='bg-[#622385] hover:bg-[#32064A] text-white px-4 sm:px-6 py-2 rounded-md text-sm transition-all hover:shadow-md min-w-[90px] font-medium flex-1 sm:flex-none'>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className='bg-[#622385] hover:bg-[#32064A] text-white px-4 sm:px-6 py-2 rounded-md text-sm transition-all hover:shadow-md min-w-[90px] font-medium flex-1 sm:flex-none'>
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </>
  )
}

export default App
