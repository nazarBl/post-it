const PostModel = require('../models/Post')

module.exports = {
    create: async (req, res)=>{
        try {
            console.log(req.body);
            const doc = new PostModel({
                title:req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                author: req.userId,
                viewsCount: req.body.viewsCount,
                tags: req.body.tags.split(','),
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
    getAllPosts: async (req, res)=>{
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
    getPostById: async (req, res)=>{
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
            ).populate('author')
    
            return res.json(post)
   
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message:'Cant receive a post'
            })
        }
    },
    getPopularPosts: async (req, res)=>{
        try {
            const popularPosts = await PostModel.find().sort({"viewsCount":-1}).populate('author').exec()
                return res.json(popularPosts)
        } catch (error) {
            res.status(500).json({"error":"error.message"})
        }
    },

    getPostsByTag: async (req, res)=>{
       try {
        const tagFilter = req.params.tagName
       
        const filteredPosts = await PostModel.find({tags:tagFilter})
     
       res.status(200).json(filteredPosts)
       } catch (error) {
        res.status(500).json({message:error.message})
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
                tags: req.body.tags.split(','),
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