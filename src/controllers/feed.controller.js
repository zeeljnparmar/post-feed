const feedService = require('../services/feed.service');

exports.getFeed = async (req, res) => {
  try {
    const { cursor, limit } = req.body;

    const result = await feedService.getFeed({
      cursor: cursor ?? undefined,
      limit: limit ?? 10
    });

    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};
