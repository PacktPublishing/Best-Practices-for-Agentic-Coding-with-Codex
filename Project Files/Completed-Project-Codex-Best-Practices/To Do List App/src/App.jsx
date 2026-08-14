import { useState, useEffect } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import styles from './App.module.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('todo-tasks')
    return stored ? JSON.parse(stored) : []
  })
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text) => {
    setTasks(prev => [
      { id: crypto.randomUUID(), text, completed: false },
      ...prev,
    ])
  }

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const editTask = (id, text) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, text } : task
      )
    )
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Todo</h1>
      <TaskInput onAdd={addTask} />
      <FilterBar filter={filter} onFilterChange={setFilter} taskCount={tasks.length} />
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  )
}

export default App

/*
Optional due-date reference (inactive):

const addTask = (text, dueDate) => {
  setTasks(prev => [
    { id: crypto.randomUUID(), text, dueDate, completed: false },
    ...prev,
  ])
}
*/
