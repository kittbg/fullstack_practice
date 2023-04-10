const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const { Client } = require('pg')
const client = new Client({connectionString: process.env.DATABASE_URL});
client.connect();
const port = process.env.PORT || 3000;

app.get('/api/cars', async (req, res)=>{
    try{
    let results = await client.query('SELECT * FROM cars');
    res.json(results.rows)
    } catch (err){
        console.error(err);
        res.status(500).send('Internal Server Issue.')
    }
})

app.get('/api/cars/:make', async (req, res)=>{
    let make = req.params.make
    try{
     let results = await client.query('SELECT * FROM cars WHERE make = $1', [make]);
     res.json(results.rows)
    } catch (err){
        console.error(err);
        res.status(500).send('Internal Server Error.')
    }
})

app.post('/api/cars/', async (req, res)=>{
    let make = req.body.make;
    let model = req.body.model;
    let year = req.body.year;
    let color = req.body.color
    try {
       await client.query('INSERT INTO cars (make, model, year, color) VALUES ($1, $2, $3, $4)', [make, model, year, color]);
       res.send('Car added to table.')
    } catch (err){
        console.error(err);
        res.status(400).send('Addition failed')
    }
})

app.put('/api/cars/:id', async (req, res)=>{
   let make = req.body.make;
   let model = req.body.model;
   let year = req.body.year;
   let color = req.body.color;
   let id = req.params.id
    try{
      await client.query('UPDATE cars SET make = $1, model = $2, year = $3, color = $4 WHERE id = $5', [make, model, year, color, id]);
      res.send('Entity successfully replaced')
    } catch (err){
        console.error(err);
        res.status(400).send('Action failed.')
    }
})


app.patch('/api/cars/:id', async (req, res)=>{
    let key = Object.keys(req.body)[0];
    let value = Object.values(req.body)[0];
    let id = req.params.id
    try{
      let results = await client.query(`UPDATE cars SET `+ key +` = $1 WHERE id = $2`, [value, id]);
      if (results.rowCount === 0){
        res.status(404).send(`Car with ${id} was not found`)
      } else {
        res.send('Car update successful!')
      }
    } catch (err){
        console.error(err);
        res.status(404).send('Patch failed.')
    }
})

app.delete('/api/cars/:id', async (req, res)=> {
    let id = req.params.id
    try {
     await client.query('DELETE FROM cars WHERE id = $1', [id]);
     res.send(`Car with ${id} was deleted.`)
    } catch (err){
        console.error(err);
        res.status(404).send('Delete failed')
    }
})

app.listen(port, (error)=>{
    if (error){
        console.error(error)
    } else {
        console.log(`This server is listening to: ${port}`)
    }
})