const express = require('express')

const app = express();

const PORT = 7000;

app.get('/',(req,res)=>{
    res.send('Home page')
})

app.listen(PORT, (err)=>{
    if(err){
        console.log(`Error when try start a server!`);
    } else {
        console.log(`Server on port ${PORT} started successfully!`);
    }
})