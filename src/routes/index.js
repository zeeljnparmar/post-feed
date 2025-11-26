import express from 'express';
const router = express.Router();

import {createPost,getPostById} from '../controllers/post.controller.js';
import {getFeed} from '../controllers/feed.controller.js';
import {likePost,unlikePost,commentPost,sharePost} from '../controllers/engagment.controller.js';

// Routes to create and get post 
router.post('/posts/create', createPost);
router.post('/posts/get', getPostById);

// Route that manages feed
router.post('/feed', getFeed);

// Route that manages engagement
router.post('/posts/like', likePost);
router.post('/posts/unlike', unlikePost);
router.post('/posts/comment', commentPost);
router.post('/posts/share', sharePost);

export default router;
