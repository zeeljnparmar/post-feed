const postService = require('../services/post.service');

exports.createPost = async (req, res) => {
  try {
    const { userId, content, media } = req.body;
    if (!userId || !content) return res.status(400).json({ error: 'userId and content required' });

    const post = await postService.createPost({ userId, content, media });
    return res.status(201).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) return res.status(400).json({ error: 'postId required' });

    const post = await postService.getPostById(postId);
    if (!post) return res.status(404).json({ error: 'not_found' });

    return res.json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};
