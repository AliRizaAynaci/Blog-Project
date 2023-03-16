const User = require('../database/models/User');

module.exports = async (req, res) => {
    const user = await User.findById(req.params.id);

    res.render("create", {
        user: user
    });
};