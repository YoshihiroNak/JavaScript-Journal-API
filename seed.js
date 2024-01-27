import { closeConnection, EntryModel, CategoryModel } from './db.js'

const categories = [
    {
        "name": "Food"
    },
    {
        "name": "Gaming"
    },
    {
        "name": "Coding"
    },
    {
        "name": "Other"
    }
]

await CategoryModel.deleteMany()
console.log('Deleted categories')
// insert return their object inmplucity
const cats = await CategoryModel.insertMany(categories)
console.log('Added categories')


const entries = [
    {category: cats[0], content: 'Pizza is yummy'},
    {category: cats[1], content: 'Coding is fun'},
    {category: cats[2], content: 'Skyrim is for the Nords'}
]

await EntryModel.deleteMany()
console.log('Deleted entryies')
await EntryModel.insertMany(entries)
console.log('Added entries')

// process.send('SIGTERM')
// process.kill(process.pid, "SIGINT")

closeConnection()