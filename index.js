const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt =require('bcrypt')
const mongoose = require('mongoose')
const registerValidation = require('./validations/auth')
const {validationResult} = require('express-validator')

const UserModel = require('./models/User')

const PORT = 7000;
mongoose.connect('mongodb+srv://Admin:123123123@cluster0.afio7fk.mongodb.net/post-it?retryWrites=true&w=majority').then(()=>{
    console.log('DB connected');
}).catch((err)=>{
    console.log('DB connection error', err);
})
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Home page')
})

app.post('/auth/registration', registerValidation, async (req,res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }
    const userPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userPassword, salt);

    const doc = new UserModel({
        email:req.body.email,
        name:req.body.name,  
        password: passwordHash,
        avatarUrl:req.body.avatarUrl,
    })

    const user = await doc.save()

    const token = jwt.sign({
        _id: user._id,
    },
    'secretKiey',
    {
        expiresIn:'30d',
    })

    const {password, ...userData} = user._doc

    res.json({
        ...userData,
        token
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Registration failed!'
        })
    }
})

app.listen(PORT, (err)=>{
    
    if(err){
        console.log(`Error when try start a server!`);
    } else {
        console.log(`Server on port ${PORT} started successfully!`);
    }
})