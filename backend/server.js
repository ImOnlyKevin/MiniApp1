const express = require('express')
const knex = require('knex')(require('./knexfile.js')['development']);
const cors = require('cors')
const port = 3001

const server = express()

server.use(cors())
server.use(express.json())

server.get('/movies', (req, res) => {
    knex('movies').select()
        .then(movies => {
            res.status(200).json(movies)
        })
})

server.post('/movies', async (req, res) => {
    let titleExists = await knex('movies').select().where({title: req.body.title})
    if (titleExists.length === 0) {
        //post to db
        knex('movies').insert({title: req.body.title})
        .then(res.status(200).json(`Adding ${req.body.title} to the database.`))
        
    } else {
        res.status(400).json(`${req.body.title} is already in the database.`)
    }
})

server.delete('/movies', (req, res) => {
    knex('movies').where({title: req.body.title}).del()
        .then(res.status(200).json(`${req.body.title} was deleted from the database.`))
        .catch(err => res.status(400).json(err))
})

server.listen(port, () => console.log('Server open on port ', port))