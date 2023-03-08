const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const PORT = 7000;
mongoose.connect('mongodb+srv://Admin:123123123@cluster0.afio7fk.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log('DB connected');
}).catch((err)=>{
    console.log('DB connection error', err);
})
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Home page')
})

app.post('/auth/login',(req,res)=>{
    const token = jwt.sign({
        name: req.body.name,
        password: req.body.password
    },
    'secretCryptoKey')
    res.json({token})
})
app.listen(PORT, (err)=>{
    
    if(err){
        console.log(`Error when try start a server!`);
    } else {
        console.log(`Server on port ${PORT} started successfully!`);
    }
})