const bcrypt = require('bcrypt');
const User = require('../database/models/User');

module.exports = async (req, res) => {
    const {
        email,
        password,
    } = req.body;
    // try to find the user
    try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.redirect('/auth/login');
        }
      
        const same = await bcrypt.compare(password, user.password);
        if (same) {
          req.session.userId = user._id;
          res.redirect('/');
        } else {
          res.redirect('/auth/login');
        }
      } catch (error) {
        console.log(error);
        res.redirect('/auth/login');
      }
      
}