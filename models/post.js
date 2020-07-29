import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({

    title: {type: String, required: [true, 'Title is required']},
    userName: String,
    description: String,
    userId: String,
    date: {type: Date, default: new Date() },
    active: {type: Boolean, default: true}

});

const Post = mongoose.model('post', postSchema);

export default Post;