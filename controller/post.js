const Post = require('../models/post')

exports.search = async (req, res) => {
    const query = req.query.q
    if (query) {
        const post = await Post.find({
            $or: [
                {
                    title: { $regex: '.*' + query + '.*', $options: 'i' }
                }
            ]
        })
        
        res.status(200).json(post)
    } else {
        const posts = await Post.find().sort({ created: -1 })
        if (posts.length === 0) {
            return res.status(200).json({ post: 'No have post'})
        }
        res.status(200).json(posts)
    }
}