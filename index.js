const express = require('express')
const PORT = 7000;

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Home page')
})

app.post('/auth/login',(req,res)=>{
    res.json(req.body)
})
app.listen(PORT, (err)=>{
    if(err){
        console.log(`Error when try start a server!`);
    } else {
        console.log(`Server on port ${PORT} started successfully!`);
    }
})