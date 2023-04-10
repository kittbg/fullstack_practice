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
        const results = await client.query('SELECT * FROM cars');
        res.json(results.rows)
    } catch (error){
        console.error(error);
        res.status(500).send('Internal Server Error')
    }
})

app.get('/api/cars/:make', async (req, res)=>{
   try{
     let results = await client.query('SELECT * FROM cars WHERE make = $1', [req.params.make]);
     res.json(results.rows)
   } catch (error){
    res.status(500).send('Internal Server Error')
   }
})


app.listen(port, (error)=>{
    if (error){
        console.error(error)
    } else {
        console.log(`This server is listening to: ${port}`)
    }
})