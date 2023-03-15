const jwt = require('jsonwebtoken')
const bcrypt =require('bcrypt')

const {validationResult} = require('express-validator')
const UserModel = require('../models/User')
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
        
            const {password, ...userData} = user._doc
        
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
          
    
            if(!user){
                return res.status(404).json({
                    message:`User not found!`
                })
            }
            const {password, ...userData} = user._doc
    
        res.json(userData);
        } catch (error) {}
    }
}

module.exports = UserController;

