const CommentModel = require ('../models/Comment')


module.exports = {
    getCommentsByPostId: async (req,res) => {
        try {
            const comments = await CommentModel.find({parentPost:req.params.postId}).populate('user')
            return res.status(200).json(comments)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    }
}