const PostModel = require('../models/Post')

const dataConverter = (data)=>{
    if (data.length){
        for(post of data){
            let month =post.createdAt.toString().split(' ')[1]
            let year = post.createdAt.toString().split(' ')[3]
            let dayOfTheMonth = post.createdAt.toString().split(' ')[2]
            let time =post.createdAt.toString().split(' ')[4].split(':').slice(0,2).join(':');
            post.dateOfCreate =[dayOfTheMonth, month, year, time].join(' ');
        }
    } else {
        let month =data.createdAt.toString().split(' ')[1]
        let year = data.createdAt.toString().split(' ')[3]
        let dayOfTheMonth = data.createdAt.toString().split(' ')[2]
        let time =data.createdAt.toString().split(' ')[4].split(':').slice(0,2).join(':');
        data.dateOfCreate =[dayOfTheMonth, month, year, time].join(' ');
    }
   
    return data
}

module.exports = {
    create: async (req, res)=>{
        try {
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

        const posts = await PostModel.find().sort({createdAt:-1}).populate('author').exec();
        dataConverter(posts);
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
            dataConverter(post)
    
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
            dataConverter(popularPosts)    
            return res.json(popularPosts)
        } catch (error) {
            res.status(500).json({"error":"error.message"})
        }
    },

    getPostsByTag: async (req, res)=>{
       try {
        const tagFilter = req.params.tagName
       
        const filteredPosts = await PostModel.find({tags:tagFilter}).populate('author').exec()
        dataConverter(filteredPosts);
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
            const _id = req.body.id;

            await PostModel.updateOne({
                _id,
            },
            {
                title:req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                author: req.userId,
                viewsCount: req.body.viewsCount,
                tags: req.body.tags.replace(' ','').split(','),
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