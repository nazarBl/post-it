const jwt = require('jsonwebtoken')
const bcrypt =require('bcrypt')

const {validationResult} = require('express-validator')
const UserModel = require('../models/User')

const dataConverter = (data)=>{               // to replace
    data.regTime = data.createdAt.toString().split(' ').slice(1,4). join(' ')
    return data;
}

const UserController = {
    register : async (req,res)=>{
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
            fullName:req.body.fullName,  
            password: passwordHash,
            avatarUrl:req.body.avatarUrl?req.body.avatarUrl:"",
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
    },
    
    login : async (req,res)=>{
        try {
            const user = await UserModel.findOne({ email:req.body.email })
            if(!user){
                return res.status(404).json({
                    message:'Wrong login or password!'
                })
            }

            const isValidPass = bcrypt.compare(req.body.password, user._doc.password)
    
            if (!isValidPass){
                return res.status(404).json({
                    message:'Wrong login or password!'
                })
            }   
    
            const token = jwt.sign({
                _id: user._id,
            },
            'secretKiey',
            {
                expiresIn:'30d',
            })
        
            const {password, ...userData} = user._doc // take out password for security reasons
        
            res.json({
                ...userData,
                token
            });
        } catch (error) {
            res.status(500).json({
                message:'Authorization failed!'
            })
        }
    },
    
    getMe : async (req,res)=>{
        try {
            const user = await UserModel.findById(req.userId)
            dataConverter(user);
    
            if(!user){
                return res.status(404).json({
                    message:`User not found!`
                })
            }
            const {password, ...userData} = user._doc

        res.json(userData);
        } catch (error) {
            console.log("user not found");
        }
    },

    updateMe: async (req,res)=>{
        try {
            const userId = req.userId;

            const {fullName, email, avatarUrl} = req.body;
            const updatedUser = await UserModel.updateOne({
                _id:userId,
            },{
                fullName, email, avatarUrl
           
            })
            return res.status(200).json(updatedUser)
        } catch (error) {
            return res.status(404).json({
                message:`User not found!`
            })
        }
    }
}

module.exports = UserController;

