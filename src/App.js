import './App.css'
import Header from './Components/Header'
import Tasks from './Components/Tasks'
import { useState } from 'react'
import AddTask from './Components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  // above is defined to toggle the list on screen
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctors appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Meeting at school',
      day: 'Feb 6th at 1:30pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Food Shopping',
      day: 'Feb 5th at 2:30pm',
      reminder: false,
    },
  ])

  // Add Task
  const addTask = (task) => {
    // in order to generate and id
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  // Delete Task
  // we are filtering the items whose id is not passed up the chain by clicking
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task,
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
