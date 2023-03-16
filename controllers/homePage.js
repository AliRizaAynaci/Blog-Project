const Post = require('../database/models/Post')
const User = require('../database/models/User');

module.exports = async (req, res) => {
    const posts = await Post.find({});
    const user = await User.find({});

    res.render("index", {
        posts: posts,
        user: user
    });
}