const Post = require('../database/models/Post')
const User = require('../database/models/User')

module.exports = async (req, res) => {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.params.id);

    res.render("post", {
        post: post,
        user: user
    });
}