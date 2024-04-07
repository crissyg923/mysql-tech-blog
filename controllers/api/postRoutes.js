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
// router.put('/:id', async (req, res) => {
//   try {
//     const editPost = await BlogPost.update(
//     {
//       title: title,
//       body: body,
//       id: id,
//       user_id: req.session.user_id,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     });
//     console.log(req.body);
//     res.status(200).json(editPost);
//   } catch (err) {
//       res.status(500).json(err);
//     };
// });

// router.put('/:id', async (req, res) => {
//   try {
//     const [affectedRows] = await BlogPost.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (affectedRows > 0) {
//       res.status(200).end();
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.put('/:id', async (req, res) => {
//   try {
//     const { title, body } = req.body; // Destructure title and body from req.body
//     const id = req.params.id; // Get id from req.params
//     const editPost = await BlogPost.update(
//     {
//       title: title,
//       body: body,
//       user_id: req.session.user_id,
//     },
//     {
//       where: {
//         id: id, // Use id obtained from req.params
//       },
//     });
//     console.log(req.body);
//     res.status(200).json(editPost);
//   } catch (err) {
//       res.status(500).json(err);
//     };
// });

router.put('/:id', async (req, res) => {
  try {
     const { title, body } = req.body; // Destructure title and body from req.body
     const id = req.params.id; // Get id from req.params
     const [affectedRows] = await BlogPost.update(
       {
         title: title,
         body: body,
         user_id: req.session.user_id,
       },
       {
         where: {
           id: id, // Use id obtained from req.params
         },
       }
     );
 
     if (affectedRows === 0) {
       // No rows were affected, handle accordingly
       res.status(404).json({ message: 'No post found with the provided ID' });
     } else {
       // Rows were affected, proceed as normal
       console.log(req.body);
       res.status(200).json({ message: 'Post updated successfully' });
     }
  } catch (err) {
     res.status(500).json(err);
  }
 });
 


module.exports = router;