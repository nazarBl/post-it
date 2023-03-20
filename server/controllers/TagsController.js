const PostModel = require('../models/Post')

module.exports = {
    getActualTags: async (req,res)=>{
        try {
            const posts = await PostModel.find().limit(5).exec();

            const tags = posts.map(post=>post.tags).flat().slice(0, 5)
            res.json(tags)
            
        } catch (error) {
            res.status(500).json({
                message:'Cannot get actual tags'
            })
        }
    }
}