const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const Pokemon = require('pokemon');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// Handle pokemon GET route for all pokemon
app.get('/pokemon/', async (req, res) => {
  let response = await Pokemon.all();
  res.status(200).send(response)
})

// Handle pokemon GET route for specific pokemon
app.get('/pokemon/:id', (req, res) => {
  const id = req.params.id

  res.status(200).send({test: 'ok'})
})

// Handle pokemon POST route
app.post('/pokemon/', (req, res) => {
  const {name, height, weight, avatar} = req.body

  res.status(200).send({success: true})
})

// Handle pokemon PUT route
app.put('/pokemon/:id', (req, res) => {
  const {id} = req.params
  const query = `SELECT * FROM pokemon_tb WHERE id=${id} LIMIT 1`

  res.status(200).send({success: true})
})

// Handler pokemon DELETE route
app.delete('/pokemon/:id', (req, res) => {
  const {id} = req.params
  const query = `DELETE FROM pokemon_tb WHERE id=${id}`

  res.status(200).send({success: true})
})

// Handle in-valid route
app.all('*', function (req, res) {
  const response = {data: null, message: 'Route not found!!'}
  res.status(400).send(response)
})

// wrap express app instance with serverless http function
module.exports.handler = serverless(app)