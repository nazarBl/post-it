const PostModel = require('../models/Post')

module.exports = {
    getActualTags: async (req,res)=>{
        try {
            const posts = await PostModel.find().limit(5).exec();
            
            const tags = posts.map(post=>post.tags).flat();
            const actualTags = [];
            for(tag of tags){
                if(!actualTags.includes(tag)){
                    actualTags.push(tag);
                }
            }        
            res.json(actualTags.slice(0,5))
            
        } catch (error) {
            res.status(500).json({
                message:'Cannot get actual tags'
            })
        }
    }
}