const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config(); 
const { Client} = require('pg')
const client = new Client({connectionString: process.env.DATABASE_URL});
client.connect();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());


app.get('/', async (req, res) =>{
    try {
        let result = await client.query('SELECT * FROM cars')
        res.send(result.rows)
    } catch (err){
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/api/cars/:make', async (req, res) =>{
    try {
        let result = await client.query('SELECT * FROM cars WHERE make = $1', [req.params.make]);
        res.send(result.rows)
    } catch (err){
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
})


app.listen(port, (error)=> {
        console.log(`This server is listening to port: ${port}`)
})
