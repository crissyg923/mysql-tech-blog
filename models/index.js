const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment')

// User.hasMany(BlogPost, {
//   foreignKey: 'user_name',
//   onDelete: 'CASCADE'
// });

BlogPost.belongsTo(User, {
  foreignKey: 'user_name',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_name',
  onDelete: 'CASCADE'
});

BlogPost.hasMany(Comment, {
  foreignKey:'post_id',
  onDelete: 'CASCADE'
});

module.exports = { User, BlogPost, Comment};
