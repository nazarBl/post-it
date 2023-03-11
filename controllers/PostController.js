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
   
}