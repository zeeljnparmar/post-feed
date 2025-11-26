const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller.js');
const feedController = require('../controllers/feed.controller.js');
const engagementController = require('../controllers/engagment.controller.js');

/**
 * Posts
 */
router.post('/posts/create', postController.createPost);
router.post('/posts/get', postController.getPostById);

/**
 * Feed (cursor + limit in body)
 */
router.post('/feed', feedController.getFeed);

/**
 * Engagement
 */
router.post('/posts/like', engagementController.likePost);
router.post('/posts/unlike', engagementController.unlikePost);
router.post('/posts/comment', engagementController.commentPost);
router.post('/posts/share', engagementController.sharePost);

module.exports = router;
