import './App.css'
import Header from './Components/Header'
import Tasks from './Components/Tasks'
import { useState, useEffect } from 'react'
import AddTask from './Components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  // above is defined to toggle the list on screen
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])


  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }


//Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }


  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    
    const data = await res.json()
    setTasks([...tasks, data])

    // in order to generate and id
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }
  
  // Delete Task
  // we are filtering the items whose id is not passed up the chain by clicking
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
  method: 'DELETE'
})
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle Reminder
  const toggleReminder =async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task,
      ),
    )
  }
  // whenever a task is doubble clicked it makes the remider opposite of current value

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {/* function above will reverse the value for showAddTask */}
      {showAddTask && <AddTask onAdd={addTask} />}
      {/* if in ternary there is no else we can show it like above  and we want to make button toggles the form we will add it to Header component*/}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'No Tasks to Show'
      )}
    </div>
  )
}

export default App
