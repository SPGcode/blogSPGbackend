import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({

    title: {type: String, required: [true, 'Title is required']},
    name: String,
    description: String,
    userId: String,
    date: {type: Date, default: Date.now},
    active: {type: Boolean, default: true}

});

const Post = mongoose.model('post', postSchema);

export default Post;