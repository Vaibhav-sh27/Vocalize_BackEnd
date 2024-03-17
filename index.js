const express = require('express');
const cors = require('cors');
const app= express();
const mongoose = require('mongoose');
const todoRoutes = require('./api/todoRoutes');
const seedDB = require('./seed');

// mongoose.connect('mongodb://127.0.0.1:27017/Todo')
//   .then(() => console.log('DB Connected!'));

mongoose.connect('mongodb+srv://vaibhavshrotriyas:Vaibhav2876@cluster0.mkuk0qb.mongodb.net/TodoDB?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('DB Connected!'));

// seedDB();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(todoRoutes);

app.get('/' , (req , res)=>{
    res.status(200).json({msg: "Welcome to Vocalize Backend"})
 })

const PORT=8089
app.listen(PORT, ()=>{
    console.log("Server Connected at "+PORT);
})