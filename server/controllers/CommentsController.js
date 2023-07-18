const CommentModel = require ('../models/Comment')
const PostModel = require('../models/Post')


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
            const {newCommentId} = await CommentModel.find({user, text:commentText},{_id:1})
            await PostModel.findOneAndUpdate(
                { _id: parentPost },
                { $inc: { commentsCount:1 }
                },
                { returnDocument: 'after' }
            ).populate('author')
            const updatedPost = await PostModel.find({_id:parentPost})
            return res.status(204).json(newComment)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    }
}