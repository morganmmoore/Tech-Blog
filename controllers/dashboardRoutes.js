const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            attributes: ['comment_text', 'created_at']
          },
        ],
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in
      });
    } catch(err) {
        res.status(500).json(err);
    }
}); 

// router.get('/edit/:id', withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: [
//       'id',
//       'title',
//       'content',
//       'created_at'
//     ],
//     include: [
//       {
//         model: User,
//         attributes: ['username']
//       },
//       {
//         model: Comment,
//         attributes: [
//           'id', 
//           'comment_text', 
//           'post_id', 
//           'user_id', 
//           'created_at'
//         ],
//       }
//     ]
//   });

//   const post = postData.map((post) => post.get({ plain: true }));

//       res.render('dashboard', {
//         post,
//         logged_in: req.session.logged_in
//       });
//     } catch(err) {
//         res.status(500).json(err);
//     }
// }); 


module.exports = router;