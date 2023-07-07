const express = require('express');
const { PostController } = require('../controllers');
const { newPostValidation } = require('../validations');
const { handleValidationErrors, checkAuth } = require('../middlewares');

const postsRouter = express.Router()

postsRouter.get('/popular', PostController.getPopularPosts);
postsRouter.get('/myPosts', checkAuth, PostController.getMyPosts)
postsRouter.get('/:id', PostController.getPostById);
postsRouter.get('/', PostController.getAllPosts);

postsRouter.post('/create', checkAuth, newPostValidation, handleValidationErrors, PostController.createPost);
postsRouter.delete('/:id', checkAuth, PostController.removePost);
postsRouter.patch('/:id', checkAuth, newPostValidation, handleValidationErrors, PostController.updatePost);

module.exports = postsRouter