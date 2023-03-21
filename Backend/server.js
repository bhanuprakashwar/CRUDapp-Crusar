const express = require('express')
const cors = require('cors');
const app = express()
app.use(express.json())
app.use(cors())

let users = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
]

// Get all users
app.get('/users', (req, res) => {
  res.json(users)
})

// Create a new user
app.post('/users', (req, res) => {
  const newUser = req.body
  newUser.id = users.length + 1
  users.push(newUser)
  res.json(newUser)
})

// Get a single user by ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const user = users.find(u => u.id === id)
  if (user) {
    res.json(user)
  } else {
    res.sendStatus(404)
  }
})

// Update an existing user
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const updatedUser = req.body
  const index = users.findIndex(u => u.id === id)
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser }
    res.status(200).send({message:"success"})
  } else {
    res.sendStatus(404)
  }
})

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = users.findIndex(u => u.id === id)
  if (index !== -1) {
    users.splice(index, 1)
    res.status(200).send({message:"success"})
  } else {
    res.sendStatus(404)
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
