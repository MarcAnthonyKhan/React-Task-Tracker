// Main component used in index.js

// Importing hooks for use
import { useState, useEffect } from 'react'

// Routing in React
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Importing componenets for use
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'


const App = () => {
  
  // Can return a single parent element

  // JS variables and whatever placed here

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  // Used when page loads
  // Utilizes arrow function but cannot use async, must be inside
  // Dependency array at end in the event you want to use inside
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch all tasks from server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch singular task with the matching id
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {

    // Updates server with new task
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task),
    })

    // Updates tasks state
    const data = await res.json()
    setTasks([...tasks, data])

    // // Generate random number for the id of the new task
    // const id = Math.floor(Math.random() * 10000) + 1

    // // Create new task variable with id and passed in 'task'
    // const newTask = {id, ...task}

    // // Add new task by spreading current task in array and the new task at the end
    // setTasks([...tasks, newTask])
  }

  // Delete task with matching id from server
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    // Filter the tasks array by not including the task with the passed in 'id'
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle reminder for the task with the matching id on server and in the current
  // state of tasks array
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    // Maps the reminder of the task with the matching passed in 'id' by spreading
    // the task keys that are not the reminder key and inverting the value of reminder
    // otherwise if task id doesn't match, keep everything the same for that task
    setTasks(
      tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task)
    )
  }
  
  return (
    <Router>
      <div className="container">

        <Header 
          // Arrow function for setting showAddTask value
          onAdd={() => setShowAddTask(!showAddTask)}
          // Passing showAddTask value for use
          showAdd={showAddTask}
        />

        <Routes>
          <Route path='/' element={
            <>
            {/* If showAddTask true, show Add task component and pass
                add task function */}
            {showAddTask && <AddTask onAdd={addTask} />}
            {/* If tasks are present, show Tasks component and pass tasks array, deleteTask and toggleReminder
                functions, otherwise display appropriate string */}
            {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ('No more Tasks!')}
            </>
          }/>
          <Route path='/about' element={<About/>} />
        </Routes>

        <Footer />

      </div>
    </Router>
  );
}

export default App;
