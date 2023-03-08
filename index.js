const express = require('express')
const jwt = require('jsonwebtoken')
const PORT = 7000;

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