const router = require('express').Router();
const { BlogPost } = require('../../models');


router.post('/', async (req, res) => {
  try {
    const newPost = await BlogPost.create({
      ...req.body,
      // user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;