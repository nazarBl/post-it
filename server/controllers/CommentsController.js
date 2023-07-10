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
    },
    createNewComment: async (req,res) => {
        try {
            const user = req.userId
            const {parentPost,commentText} = req.body;
            const doc = new CommentModel({
                user,
                parentPost,
                text:commentText,
            })
            const newComment = await doc.save()
            return res.status(204).json(newComment)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    }
}