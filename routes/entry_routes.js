import { Router } from "express"
import { EntryModel } from "../db.js"

// Similar to blueprint
const router = Router()

router.get('/', async (req, res) => res.send(await EntryModel.find().populate('category')))
// Retrieve one entry
// If I put 1 into :id, then that means will be entries[0]
// So entries[req.aprams.id -1] equls entries[0]
router.get('/:id', async (req, res) => {
    const entry = await EntryModel.findById(req.params.id).populate('category')
    if (entry) {
        res.send(entry)
    } else {
        res.status(404).send({ error: "Entry not found"})
    }
})


router.post('/', async (req, res) => {
    try {
        const insertedEntry = await (await EntryModel.create(req.body)).populate('category')
        // Response with 201 and the created entry
        res.status(201).send(insertedEntry)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updatedEntry = await EntryModel.findByIdAndUpdate(req.params.id, req.body, { new: true})
        if (updatedEntry) {
            res.send(updatedEntry)
        } else {
            res.status(404).send({ error: "Entry not found"})
        res.send(updatedEntry)
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedEntry = await EntryModel.findByIdAndDelete(req.params.id, req.body, { new: true})
        if (deletedEntry) {
            res.send(204)
        } else {
            res.status(404).send({ error: "Entry not found"})
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// router.use

export default router