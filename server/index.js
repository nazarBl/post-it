const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer') // multer is used to work with uploading images
const cors = require('cors') // cors make possible to run server and client on same device
const path = require('path')

const postsRouter = require('./routes/postsRouter')
const authRouter = require('./routes/authRouter')
const commentsRouter = require('./routes/commentsRouter')

const {checkAuth} = require('./middlewares/index.js')
const {TagsController} = require('./controllers/index.js')

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

app.use('/auth', authRouter)

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
app.use('/posts', postsRouter ) // Posts routers
app.use('/comments', commentsRouter) // Comments routers


app.listen(PORT, (err)=>{
    if(err){
        console.log(`Error when try start a server!`);
    } else {
        console.log(`Server on port ${PORT} started successfully!`);
        
    }
})