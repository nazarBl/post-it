const CommentModel = require ('../models/Comment')
const PostModel = require('../models/Post')
const { mongoose } = require('mongoose')
const { ObjectId} = require('mongodb')

module.exports = {
    getCommentsByPostId: async (req,res) => {
        try {
            const {postId} = req.params
            if(!mongoose.Types.ObjectId.isValid(postId)) {
                return res.status(404).json({error:'Post was not found!'})
            } 

            const comments = await CommentModel.find({parentPost:postId}).populate('user')
            return res.status(200).json(comments)
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({error:'Failed get comments for this post from server!'})
        }
    },
    createNewComment: async (req,res) => {
        try {
            const userId = req.userId
            const {parentPost,commentText} = req.body;

            const newComment = await CommentModel.create({
                user: new ObjectId(userId),
                parentPost,
                text:commentText
            })

            await PostModel.findOneAndUpdate(
                { _id: parentPost },
                { $inc: { commentsCount:1 }
                },
                { returnDocument: 'after' }
            ).populate('author')

            return res.status(201).json(newComment)
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({error:'Failed to create comment (server error)'})
        }
    },
    updateComment: async (req,res) => {
        try {
            const _id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(_id)) {
                return res.status(404).json({error:'Post was not found!'})
            } 
            const updatedComment = await CommentModel.findOneAndUpdate({_id},{
                ...req.body
            })
            res.status(200).json(updatedComment)
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({error:'Comments was not updated (server error)'})
        }
    },
    deleteComment: async (req,res) => {
        try {
            const _id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(_id)) {
                return res.status(404).json({error:'Post was not found!'})
            } 

            const commentToDelete = await CommentModel.findOneAndDelete({_id})
            const parentPost = commentToDelete.parentPost
            await PostModel.findOneAndUpdate({_id:parentPost},{$inc: {commentsCount:-1}})
            
            res.status(200).json(commentToDelete)
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({error:'Comment was not deleted (server error)'})
        }
    }
}