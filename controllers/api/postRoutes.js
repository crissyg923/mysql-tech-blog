const router = require('express').Router();
const { BlogPost } = require('../../models');


router.post('/', async (req, res) => {
  try {
    const newPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.put('/:id', async (req, res) => {
  try {
    const editPost = await BlogPost.update(
    {
      ...req.body,
      user_id: req.session.user_id,
    },
    {
      where: {
        id: req.params.id,
      },
    });
  
    res.status(200).json(editPost);
  } catch (err) {
      res.status(500).json(err);
    };
});

module.exports = router;