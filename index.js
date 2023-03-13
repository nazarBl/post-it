const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')

const {registerValidation, loginValidation, newPostValidation} = require('./validations')
const checkAuth = require('./middlewares/checkAuth')
const {register,login,getMe} = require('./controllers/UserController.js')
const PostController = require ('./controllers/PostController')

const PORT = 7000;

mongoose.connect('mongodb+srv://Admin:123123123@cluster0.afio7fk.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log('DB connected');
}).catch((err)=>{
    console.log('DB connection error', err);
})

const app = express();

const imgStorage = multer.diskStorage({
    destination: (_, __, cb)=>{
        cb(null,'uploads')
    },
    filename: (_, file, cb)=>{
        cb(null, file.originalname)
    }   
})

const upload = multer({storage:imgStorage})

app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.get('/',(req,res)=>{
    res.send('Home page')
})

app.post('/auth/registration', registerValidation, register)
app.post('/auth/login', loginValidation, login)
app.get('/auth/me', checkAuth, getMe)

app.post('/upload', checkAuth, upload.single('image'), (req,res)=>{
    res.json({
        url:`/uploads/${req.file.originalname}`,
    })
})  

app.get('/posts', PostController.getAllPosts);
app.get('/posts/:id', PostController.getPostById);
app.post('/posts', checkAuth, newPostValidation, PostController.create); 
app.delete('/posts/:id', checkAuth, PostController.remove); 
app.patch('/posts/:id', checkAuth, PostController.update);

app.listen(PORT, (err)=>{
    
    if(err){
        console.log(`Error when try start a server!`);
    } else {
        console.log(`Server on port ${PORT} started successfully!`);
        
    }
})