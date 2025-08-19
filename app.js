const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory "database"
const users = [];

// Create user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }
  const user = { id: users.length + 1, name, email };
  users.push(user);
  res.status(201).json(user);
});

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
