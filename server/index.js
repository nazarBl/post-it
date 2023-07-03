const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer') // multer is used to work with uploading images
const cors = require('cors') // cors make possible to run server and client on same device
const path = require('path')

const {registerValidation, loginValidation, newPostValidation} = require('./validations')
const {checkAuth, handleValidationErrors} = require('./utils/index.js')
const {UserController, PostController, TagsController, CommentsController} = require('./controllers/index.js')

const PORT = 7000;

mongoose.connect('mongodb+srv://Admin:123123123@cluster0.afio7fk.mongodb.net/post-it?retryWrites=true&w=majority').then(()=>{
    console.log('DB connected');
}).catch((err)=>{
    console.log('DB connection error', err);
})

const app = express();

const postImgStorage = multer.diskStorage({
    destination: (req, file, cb)=>{ // no request and no file provided
        cb(null,'uploads/postImg') // null for possible error (not catched)
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname) // null for possible error (not catched)
    }   
})

const userAvatarStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'uploads/avatars')
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

const uploadPostImg = multer({storage:postImgStorage})
const uploadUserAvatar = multer({storage:userAvatarStorage})

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.get('/',(req,res)=>res.send('Home page'))

app.post('/auth/registration', registerValidation, handleValidationErrors, UserController.register)
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)
app.patch('/auth/me', checkAuth, UserController.updateMe)

app.post('/upload/postImage', checkAuth, uploadPostImg.single('postImage'), (req,res)=>{ // upload image
    res.json({
        url:`/uploads/postImg/${req.file.originalname}`,
    })
}) 

app.post('/upload/avatar', checkAuth, uploadUserAvatar.single('userAvatar'), (req,res)=>{
    res.json({
        url:`/uploads/avatars/${req.file.filename}`,
    })
})

app.get ('/tags', TagsController.getActualTags);        
app.get('/posts/:tagName', PostController.getPostsByTag);

app.get('/posts', PostController.getAllPosts);
app.get('/popular', PostController.getPopularPosts)
app.post('/post/create', checkAuth, newPostValidation, handleValidationErrors, PostController.createPost); 
app.get('/post/:id', PostController.getPostById);
app.delete('/post/:id', checkAuth, PostController.removePost); 
app.patch('/post/:id', checkAuth, newPostValidation, handleValidationErrors, PostController.updatePost);


app.get('/comments/:postId', checkAuth, CommentsController.getCommentsByPostId)


app.listen(PORT, (err)=>{
    
    if(err){
        console.log(`Error when try start a server!`);
    } else {
        console.log(`Server on port ${PORT} started successfully!`);
        
    }
})