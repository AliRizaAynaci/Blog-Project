const mongoose = require('mongoose');

// Defining a Model
const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    username: String,
    image: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

// Accessing a Model
/* The first argument is the singular name of the collection your 
model is for. Mongoose automatically looks for the plural version 
of your model name*/
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;