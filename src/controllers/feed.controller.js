import {feedService} from '../services/feed.service.js'
import {validateFields} from '../utils/validation.js'
// Controller that manages Feed

export const getFeed = async (req, res) => {
  try {
    const { cursor, limit } = req.body;
    if (!validateFields(req, res, ["limit"])) return;
    const result = await feedService.getFeed({
      cursor: cursor ?? undefined,
      limit: limit ?? 10
    });
    //? Sending Succes response
    return res.json(result);
  } catch (err) {
    console.error(err);
    //! Sending Error 
    return res.status(500).json({ error: 'internal_error' });
  }
};
