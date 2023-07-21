const path = require('path')
const Post = require('../database/models/Post')

module.exports = async (req, res) => {
    try {
        const { image } = req.files;
        
        await image.mv(path.resolve(__dirname + '/../public/posts', image.name));

        const post = await Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        });
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};
