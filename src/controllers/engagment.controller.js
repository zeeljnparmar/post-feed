const engagementService = require('../services/engagement.service');

exports.likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    if (!postId || !userId)
      return res.status(400).json({ error: 'postId and userId required' });

    const result = await engagementService.like(postId, userId);
    return res.json(result);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    if (!postId || !userId)
      return res.status(400).json({ error: 'postId and userId required' });

    const result = await engagementService.unlike(postId, userId);
    return res.json(result);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const { postId, userId, text } = req.body;

    if (!postId || !userId || !text)
      return res.status(400).json({ error: 'postId, userId and text required' });

    const comment = await engagementService.comment(postId, userId, text);
    return res.status(201).json(comment);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};

exports.sharePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    if (!postId || !userId)
      return res.status(400).json({ error: 'postId and userId required' });

    const result = await engagementService.share(postId);
    return res.json(result);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};
