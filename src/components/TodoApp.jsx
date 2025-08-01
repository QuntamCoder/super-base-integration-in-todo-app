import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './TodoApp.css'

function TodoApp() {
  const [todos, setTodos] = useState([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos()
  }, [])

  // READ: Fetch all todos from Supabase
  const fetchTodos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setTodos(data || [])
    } catch (error) {
      setError('Error fetching todos: ' + error.message)
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // CREATE: Add new todo
  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTask.trim()) return

    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([
          { task: newTask.trim(), is_completed: false }
        ])
        .select()
      
      if (error) throw error
      
      // Add new todo to the beginning of the list
      setTodos([data[0], ...todos])
      setNewTask('')
    } catch (error) {
      setError('Error adding todo: ' + error.message)
      console.error('Error:', error)
    }
  }

  // UPDATE: Toggle todo completion
  const toggleTodo = async (id, currentStatus) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ is_completed: !currentStatus })
        .eq('id', id)
        .select()
      
      if (error) throw error
      
      // Update the todo in our state
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, is_completed: !currentStatus } : todo
      ))
    } catch (error) {
      setError('Error updating todo: ' + error.message)
      console.error('Error:', error)
    }
  }

  // DELETE: Remove todo
  const deleteTodo = async (id) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      // Remove todo from our state
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (error) {
      setError('Error deleting todo: ' + error.message)
      console.error('Error:', error)
    }
  }

  if (loading) {
    return <div className="loading">Loading todos...</div>
  }

  return (
    <div className="todo-app">
      <h1>🚀 QuntamCoder's Todo App</h1>
      <p>Connected to Supabase Database!</p>
      
      {error && <div className="error">{error}</div>}
      
      {/* Add new todo form */}
      <form onSubmit={addTodo} className="add-todo-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
          className="todo-input"
        />
        <button type="submit" className="add-button">
          Add Todo
        </button>
      </form>

      {/* Display todos */}
      <div className="todos-container">
        <h2>Your Todos ({todos.length})</h2>
        {todos.length === 0 ? (
          <p className="no-todos">No todos yet. Add one above! 📝</p>
        ) : (
          <ul className="todos-list">
            {todos.map((todo) => (
              <li key={todo.id} className={`todo-item ${todo.is_completed ? 'completed' : ''}`}>
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.is_completed}
                    onChange={() => toggleTodo(todo.id, todo.is_completed)}
                    className="todo-checkbox"
                  />
                  <span className="todo-task">{todo.task}</span>
                  <small className="todo-date">
                    {new Date(todo.created_at).toLocaleDateString()}
                  </small>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Real-time connection status */}
      <div className="connection-status">
        ✅ Connected to Supabase Database
      </div>
    </div>
  )
}

export default TodoApp