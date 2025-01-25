const Post = require('../models/post');

const resolvers = {
    getPosts: async () => {
        try {
            return await Post.find();
        } catch (err) {
            throw new Error(err);
        }
    },
    getPost: async ({ id }) => {
        try {
            const post = await Post.findById(id);
            if (!post) {
                throw new Error("Post not found");
            }
            return post;
        } catch (err) {
            throw new Error(err);
        }
    },
    addPost: async ({ title, content }) => {
        try {
            const post = new Post({ title, content });
            return await post.save();
        } catch (err) {
            throw new Error(err);
        }
    },
};

module.exports = resolvers;
