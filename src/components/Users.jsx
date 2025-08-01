// components/Users.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // READ: Fetch users
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  // CREATE: Add new user
  const addUser = async (name, email) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ name, email }])
        .select()
      
      if (error) throw error
      setUsers([...users, ...data])
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  // UPDATE: Edit user
  const updateUser = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      setUsers(users.map(user => 
        user.id === id ? data[0] : user
      ))
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  // DELETE: Remove user
  const deleteUser = async (id) => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      setUsers(users.filter(user => user.id !== id))
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <button onClick={() => updateUser(user.id, { name: 'Updated Name' })}>
            Update
          </button>
          <button onClick={() => deleteUser(user.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default Users