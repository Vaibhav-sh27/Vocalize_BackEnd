const express = require('express');
const router = express.Router();
const todo = require('../models/Todo');

router.get('/todos', async (req, res)=>{
    try {
        let data = await todo.find({});
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({msg: "something went wrong", err: err})
    }
})

router.post('/addtodo', async (req, res)=>{
    try {
        let {task, isComp} = req.body;
        let response = await todo.create({task, isComp}).then((ress)=>{
            return ress;
        }); 
        console.log(response);
        res.status(201).json({msg: 'Todo Created', data: response});
    } catch (err) {
        res.status(400).json({msg: "something went wrong", err: err})
    }
})

router.patch('/todo/:id', async (req, res)=>{
    try {
        let {task, isComp} = req.body;
        let {id} = req.params;
        await todo.findByIdAndUpdate(id, {task, isComp});
        res.status(201).json({msg: 'Todo Updated'});
    } catch (err) {
        res.status(400).json({msg: "something went wrong", err: err})
    }
})

router.delete('/todo/:id', async (req, res)=>{
    try {
        let {id} = req.params;
        await todo.findByIdAndDelete(id);
        res.status(201).json({msg: 'Todo Deleted'});
    } catch (err) {
        res.status(400).json({msg: "something went wrong", err: err})
    }
})

router.get('/todo/:id', async (req, res)=>{
    try {
        let {id} = req.params;
        let item = await todo.findById(id);
        res.status(200).json(item);
    } catch (err) {
        res.status(400).json({msg: "something went wrong", err: err})
    }
})



module.exports=router