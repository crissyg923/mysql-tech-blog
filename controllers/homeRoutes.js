const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    
    const posts = blogPostData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in
    });
    // res.json(blogPostData);
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

    res.render('blogpost', {
      ...blog,
      logged_in: true
    });
    // res.json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// How can I just get user's posts?
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    
    const blogPostData = await BlogPost.findAll();

    const posts = blogPostData.map((post) => post.get({ plain: true }));

    res.render('dashboard', { 
      posts, 
      logged_in: req.session.logged_in
    });
    // res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


// router.post('/login', async (req, res) => {
//   try {
   
//     const userData = await User.findOne({where: {email: req.body.email } });
//      if(!userData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password!'})
//       return;
//      }
//     const user = userData.get({ plain: true });
//     const vaildPassword = await userData.checkPassword(req.body.password);

//     if (!vaildPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password!'});
//         return;
//     }

//     res.render('dashboard', {
//       ...user,
//       logged_in: true
//     });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;

