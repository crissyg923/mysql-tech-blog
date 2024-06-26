const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    
    const allposts = blogPostData.map((post) => post.get({ plain: true }));
    const posts = allposts.slice(-4);
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in
    });
    // res.json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/allposts', async (req, res) => {
  try {
    
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    
    const posts = blogPostData.map((post) => post.get({ plain: true }));
    res.render('allposts', { 
      posts, 
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogpost/:id', async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User]
          
        }
      ]
    });
    if(!blogData) {
      res.status(404).json({message: 'No post with that id.'});
      return;
    }

    const blog = blogData.get({ plain: true });
    console.log(blog);
    res.render('blogpost', {
      ...blog,
      logged_in: req.session.logged_in
    });
    // res.render('blogpost', {blog});
    // res.json(blog);
 
  } catch (err) {
    res.status(500).json(err);
  }
});

// How can I just get user's posts?
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('dashboard', { 
      ...user, 
      logged_in: req.session.logged_in
    });
   
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/:id', withAuth, async (req, res) => {
  try {
    const userPost = await BlogPost.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User]
          
        }
      ]
    });
    if(!userPost) {
      res.status(404).json({message: 'No post with that id.'});
      return;
    }

    const post = userPost.get({ plain: true });
    console.log(post);
    res.render('editpost', {
      post: post,
      logged_in: req.session.logged_in
    });
    console.log(post);
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

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;

