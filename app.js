const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory "database"
const users = [];

// Create user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  console.log('POST /users called with:', req.body);
  if (!name || !email) {
    console.log('POST /users missing name or email');
    return res.status(400).json({ error: 'Name and email are required.' });
  }
  const user = { id: users.length + 1, name, email };
  users.push(user);
  console.log('User created:', user);
  res.status(201).json(user);
});

// Get all users
app.get('/users', (req, res) => {
  console.log('GET /users called');
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
