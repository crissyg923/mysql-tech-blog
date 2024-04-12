const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');


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
     const { title, body } = req.body; 
     const id = req.params.id; 
     const [affectedRows] = await BlogPost.update(
       {
         title: title,
         body: body,
         user_id: req.session.user_id,
       },
       {
         where: {
           id: id, 
         },
       }
     );
 
     if (affectedRows === 0) { 
       res.status(404).json({ message: 'No post found with the provided ID' });
     } else {
       console.log(req.body);
       res.status(200).json({ message: 'Post updated successfully' });
     }
  } catch (err) {
     res.status(500).json(err);
  }
 });



router.delete('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.session.user_id; // Assuming user ID is stored in session

    // Ensure that both postId and userId are defined
    if (!postId || !userId) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    // Check if the post belongs to the current user
    const post = await BlogPost.findOne({
      where: {
        id: postId,
        user_id: userId
      }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found or user not authorized' });
    }

    // Delete the post
    await post.destroy();

    // Respond with success status
    res.status(200).end();
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;