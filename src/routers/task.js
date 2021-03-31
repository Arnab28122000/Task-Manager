const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')


router.post('/tasks', auth, async (req, res) => {
    const task= new Task({
        ...req.body, 
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(err)
    }
})

router.get('/tasks', auth, async (req, res) => {

    try{
        //1st approach
        //const task = await Task.find({owner: req.user._id})
        //res.send(task)

        //2nd approach
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id=req.params.id

    try{
        const task = await Task.findOne({ _id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowed.includes(update))

    if(!isValidOperation){
        res.status(400).send({error: "Invalid updates!"})
    }
    try{
        const task = await Task.findOne({ _id: req.params.id, owner:req.user._id})
        
        if(!task){
            return res.status(404).send()
        }

        updates.forEach(update => task[update] = req.body[update])
        await task.save()

        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        const task= await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id})
        if(!task){
            return res.status(404).send({error: "User not found!"})
        }

        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router
