import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

try {
    // THis code is from MongoDB
    const m = await mongoose.connect(process.env.DB_URI)
    console.log(m.connection.readyState === 1 ? "MongoDB connected!" : 'MongoDB failed to connect')
}
catch(err) {
    console.log(err)
}
// //Handler
// process.on('SIGINT', () => {
//     console.log('Mongoose disccecting...')
//     mongoose.disconnect()
// })

const closeConnection = () => {
    console.log('Mongoose closing...')
    mongoose.disconnect() 
}

const categoriesSchema = new mongoose.Schema({
    name: { type: String, required: true }
})

const CategoryModel = mongoose.model('Category', categoriesSchema)


// Create a schema
const entriesSchema = new mongoose.Schema({
    // Category is gonna be forein key
    category: { type: mongoose.ObjectId, ref: 'Category' },
    content: { type: String, required: true }
})

// Naming convention
const EntryModel = mongoose.model('Entry', entriesSchema)

export { closeConnection, EntryModel , CategoryModel } 