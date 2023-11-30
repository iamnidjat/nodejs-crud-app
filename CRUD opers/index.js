// npm init -> npm i express -> npm i pg -> npm i cors -> node file_name
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
let HOST = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const pool = new Pool({
  user: 'postgres', //
  host: 'localhost', //
  database: 'mydatabase', //
  password: 'admin', //
  port: 5432, //
});

app.get('/items', async (req, res) => {
    try 
    {
      const { rows } = await pool.query('SELECT * FROM items');
      res.json(rows);
      console.log(rows)
    } 
    catch (error) 
    {
      res.status(500).json({ error: error.message });
    }
});

app.get('/item/:id', async (req, res) => {
    try 
    {
      const { id } = req.params;
      const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
      res.json(rows[0]);
    } 
    catch (error) 
    {
      res.status(500).json({ error: error.message });
    }
});

app.post('/items', async (req, res) => {
    try 
    {
      const { name, description } = req.body;
      const { rows } = await pool.query(
        'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
      );
      res.status(201).json(rows[0]);
    } 
    catch (error) 
    {
      res.status(500).json({ error: error.message });
    }
});

// fetch('http://localhost:3000/items', {
//         method: 'POST',
//         headers: {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify({
//             name: "newItem",
//             description: "not bad"
//         })
//     })
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log('Request succeeded with JSON response', data);
//     })
//     .catch(function(error) {
//         console.log('Request failed', error);
//     });

app.put('/item/:id', async (req, res) => {
    try 
    {
      const { id } = req.params;
      const { name, description } = req.body;
      const { rows } = await pool.query(
        'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
        [name, description, id]
      );
      res.json(rows[0]);
    } 
    catch (error) 
    {
      res.status(500).json({ error: error.message });
    }
});

// fetch('http://localhost:3000/item/3', {
//         method: 'PUT',
//         headers: {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify({
//             name: "newItem",
//             description: "not good"
//         })
//     })
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log('Request succeeded with JSON response', data);
//     })
//     .catch(function(error) {
//         console.log('Request failed', error);
//     });


app.patch('/item/:id', async (req, res) => {
    try 
    {
      const { id } = req.params;
      const { name, description } = req.body;
      const { rows } = await pool.query(
        'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
        [name, description, id]
      );
      res.json(rows[0]);
    } 
    catch (error) 
    {
      res.status(500).json({ error: error.message });
    }
});

// fetch('http://localhost:3000/item/1', {
//         method: 'PATCH',
//         headers: {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify({
//             name: "newItem2"
//         })
//     })
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log('Request succeeded with JSON response', data);
//     })
//     .catch(function(error) {
//         console.log('Request failed', error);
//     });

app.delete('/items/:id', async (req, res) => {
    try 
    {
      const { id } = req.params;
      await pool.query('DELETE FROM items WHERE id = $1', [id]);
      res.json({ message: "Item deleted" });
    } 
    catch (error) 
    {
      res.status(500).json({ error: error.message });
    }
});

// fetch('http://localhost:3000/items/2', {
//         method: 'DELETE'
//     })
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log('Request succeeded with JSON response', data);
//     })
//     .catch(function(error) {
//         console.log('Request failed', error);
//     });
  
app.listen(HOST, () => {
    console.log('Server is running on http://localhost:3000');
});
