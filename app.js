const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use(express.json());

// Set up Postgres connection using environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get('/healthz', (req, res) => {
  res.send({ status: 'OK' });
});

// Create user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  console.log('POST /users called with:', req.body);
  if (!name || !email) {
    console.log('POST /users missing name or email');
    return res.status(400).json({ error: 'Name and email are required.' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    console.log('User created:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Database error.' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  console.log('GET /users called');
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Database error.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
