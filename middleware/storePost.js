/*
I just want all fields to be required. 
If any are missing, i just redirect back to the form.
*/
module.exports = (req, res, next) => {
    if (!req.body.username || !req.body.title ||
         !req.body.description || !req.body.content ||
          !req.files.image) {
            return res.redirect('/posts/new');
        }
        next();
}