const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment')

User.hasMany(BlogPost, {
  foreignKey: 'user_name',
  onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_name'
});

Comment.belongsTo(BlogPost, {
  foreignKey: 'post_id'
});

BlogPost.hasMany(Comment, {
  foreignKey:'post_id'
});

module.exports = { User, BlogPost, Comment};
