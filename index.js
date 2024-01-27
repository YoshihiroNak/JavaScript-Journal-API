import express from 'express'
import { CategoryModel } from './db.js'
import entryRoutes from './routes/entry_routes.js'

// Generate instance
const app = express()

// It runs to parse the body of every request
app.use(express.json())

// get request   // () callback  // Send back response to client
app.get('/', (req, res) => res.send({ info: 'Journal API'}))
// categories and entries are objects

//TODO: Move  /categories to routes folder
//TODO: Complete categories CRUD
//TODO: ADVANCED: Modify "GET /categories/:id" to embed an array of all the entries in that category


app.get('/categories', async (req, res)=> res.send(await CategoryModel.find()))
// Prefix router
app.use('/entries', entryRoutes)

// Start server and listen
app.listen(4001)