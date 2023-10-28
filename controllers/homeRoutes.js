const router = require('express').Router();
const { Project, User, BlogPost } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogPostData = await BlogPost.findAll();

    // Serialize data so the template can read it
    const posts = blogPostData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    // res.render('homepage', { 
    //   posts, 
    //   logged_in: true
    // });
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogpost/:id', async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id);
    if(!blogData) {
      res.status(404).json({message: 'No post with that id.'});
      return;
    }

    const blog = blogData.get({ plain: true });

    // res.render('blogpost', {
    //   ...blog,
    //   logged_in: req.session.logged_in
    // });
    res.json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.post('/login', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findOne({where: {email: req.body.email } });
     if(!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password!'})
      return;
     }
    const user = userData.get({ plain: true });
    const vaildPassword = await userData.checkPassword(req.body.password);

    if (!vaildPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password!'});
        return;
    }

    // res.render('profile', {
    //   ...user,
    //   logged_in: true
    // });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;

