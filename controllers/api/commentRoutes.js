const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  console.log(req.session.user_id);
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        // post_id: postId,
      });
      console.log(newComment);
      res.status(200).json(newComment);
      // res.json(newComment);
    } catch (err) {
      console.log(req.session.user_id);
      res.status(400).json(err);
    }
  });

  module.exports = router;