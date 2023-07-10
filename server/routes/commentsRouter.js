const express = require('express')
const CommentsController = require('../controllers/CommentsController.js')
const checkAuth = require('../middlewares/checkAuth.js')

const commentsRouter = express.Router()

commentsRouter.get('/:postId', checkAuth, CommentsController.getCommentsByPostId)
commentsRouter.post('/newComment', checkAuth, CommentsController.createNewComment)

module.exports = commentsRouter