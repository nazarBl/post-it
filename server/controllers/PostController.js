const PostModel = require('../models/Post')

module.exports = {
    create: async (req,res)=>{
        try {
            const doc = new PostModel({
                title:req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                author: req.userId,
                viewsCount: req.body.viewsCount,
                tags: req.body.tags,
            })

            const post = await doc.save()

            res.json(post)
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message:'Failed to create new post'
            })
        }
    },
    getAllPosts: async (req,res)=>{
        try {

        const posts = await PostModel.find().populate('author').exec();
        res.json(posts)

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message:'Cannot receive posts'
            })
        }
    },
    getPostById: async (req,res)=>{
        try {
            const postId = req.params.id;
   
            const post = await PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: {viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            }
            
        )      

        res.json(post)

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message:'Cant receive a post'
            })
        }
    },
    remove: async (req,res)=>{
        try {
            const postId = req.params.id;

            await PostModel.findOneAndDelete(
                {
                    _id:postId
                },
                res.json({
                    message:'Post was succesfully deleted'
                })
            )
            
        } catch (error) {
            console.log(error);
            res.json(404).json({
                message:'Post does not exist'
            })
        }
    },
    update: async (req,res)=>{
        try {
            const postId = req.params.id;

            await PostModel.updateOne({
                _id:postId,
            },
            {
                title:req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                author: req.userId,
                viewsCount: req.body.viewsCount,
                tags: req.body.tags,
            })

            res.json({
                message:'Post was successfully updated'
            })
        } catch (error) {
            console.log(error);
            res.json(500).json({
                message:'Post updating failed'
            })
        }
    }
}