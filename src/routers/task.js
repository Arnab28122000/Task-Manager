const express = require('express')
const router = new express.Router()
const Task = require('../models/task')


router.post('/tasks', async (req, res) => {
    const task= new Task(req.body)

    try{
        const t = await task.save()
        res.send(t)
    }catch(e){
        res.status(400).send(err)
    }
})

router.get('/tasks', async (req, res) => {

    try{
        const task = await Task.find({})
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id=req.params.id

    try{
        const task= await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowed.includes(update))

    if(!isValidOperation){
        res.status(400).send({error: "Invalid updates!"})
    }
    try{
        const task = await Task.findById(req.params.id)

        updates.forEach(update => task[update] = req.body[update])
        await task.save()

        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try{
        const task= await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send({error: "User not found!"})
        }

        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router
