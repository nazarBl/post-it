const express = require('express')
const CommentsController = require('../controllers/CommentsController.js')
const checkAuth = require('../middlewares/checkAuth.js')

const commentsRouter = express.Router()

commentsRouter.get('/:postId', CommentsController.getCommentsByPostId)
commentsRouter.post('/', checkAuth, CommentsController.createNewComment)
commentsRouter.patch('/', checkAuth, CommentsController.updateComment)
commentsRouter.delete('/:id', checkAuth, CommentsController.deleteComment)

module.exports = commentsRouter