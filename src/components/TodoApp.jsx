import { useState, useEffect } from 'react'
import { supabase } from '../lib/superbase.js'
import './TodoApp.css'

function TodoApp() {
  const [todos, setTodos] = useState([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all') // all, active, completed

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

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.is_completed
    if (filter === 'completed') return todo.is_completed
    return true
  })

  const completedCount = todos.filter(todo => todo.is_completed).length
  const activeCount = todos.length - completedCount

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your todos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-icon">📋</span>
            <span className="brand-text">TodoMaster</span>
          </div>
          <div className="nav-user">
            <div className="user-avatar">
              <span>Q</span>
            </div>
            <span className="username">QuntamCoder</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="todo-app">
          <div className="app-header">
            <h1>🚀 Your Personal Todo Manager</h1>
            <p className="app-subtitle">Stay organized and productive with your tasks</p>
            
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
          </div>
          
          {/* Add new todo form */}
          <div className="add-todo-section">
            <form onSubmit={addTodo} className="add-todo-form">
              <div className="input-group">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="What needs to be done?"
                  className="todo-input"
                />
                <button type="submit" className="add-button">
                  <span className="button-icon">+</span>
                  Add Task
                </button>
              </div>
            </form>
          </div>

          {/* Filter and Stats */}
          <div className="todo-controls">
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({todos.length})
              </button>
              <button 
                className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                onClick={() => setFilter('active')}
              >
                Active ({activeCount})
              </button>
              <button 
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed ({completedCount})
              </button>
            </div>
            
            <div className="progress-section">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${todos.length > 0 ? (completedCount / todos.length) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="progress-text">
                {todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0}% Complete
              </span>
            </div>
          </div>

          {/* Display todos */}
          <div className="todos-container">
            {filteredTodos.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No todos yet</h3>
                <p>
                  {filter === 'all' 
                    ? "Add your first task above to get started!" 
                    : `No ${filter} tasks found.`
                  }
                </p>
              </div>
            ) : (
              <ul className="todos-list">
                {filteredTodos.map((todo) => (
                  <li key={todo.id} className={`todo-item ${todo.is_completed ? 'completed' : ''}`}>
                    <div className="todo-content">
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={todo.is_completed}
                          onChange={() => toggleTodo(todo.id, todo.is_completed)}
                          className="todo-checkbox"
                          id={`todo-${todo.id}`}
                        />
                        <label htmlFor={`todo-${todo.id}`} className="checkbox-label"></label>
                      </div>
                      <div className="todo-text">
                        <span className="todo-task">{todo.task}</span>
                        <small className="todo-date">
                          {new Date(todo.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </small>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="delete-button"
                      title="Delete task"
                    >
                      <span className="delete-icon">🗑️</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>TodoMaster</h4>
            <p>Your productivity companion</p>
          </div>
          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li>Real-time sync</li>
              <li>Cloud storage</li>
              <li>Cross-platform</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <p>If you have any questions or need help, feel free to reach out!</p>
            <a href="mailto:support@tod master.com" className="support-link">Email Us</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 TodoMaster by QuntamCoder. Built with React & Supabase.</p>
        </div>
      </footer>
    </div>
  )
}

export default TodoApp