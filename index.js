// api-server/index.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const STORES = require('./mockData');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Example API route
app.get('/api/greeting', async (req, res) => {
  // Simulate hitting another backend
  const name = req.query.name || 'Guest';
  res.json({ message: `Hello, ${name}!` });
});

// Proxy example to backend
app.get('/api/external-data', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    res.json(response.data.slice(0, 5)); // Just return 5 items
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from backend' });
  }
});

app.get('/api/stores/:id', async (req, res) => {
  try {
    // Simulate hitting another backend
    const storeID = req.params.id; // Accessing the "id" from the URL
    const storeData = STORES[storeID];
    res.json({ ...storeData });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from backend' });
  }
});

app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
  console.log('STORES: ', STORES);
});
