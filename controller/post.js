const Post = require('../models/post');

exports.search = async (req, res) => {
    const query = req.query.q;
    if (query) {
        const post = await Post.find({
            $and: [
                {
                    $or: [
                        {
                            title: {
                                $regex: '.*' + query + '.*',
                                $options: 'i'
                            }
                        },
                        {
                            'detail.nearby': {
                                $regex: '.*' + query + '.*',
                                $options: 'i'
                            }
                        },
                        {
                            'location.address': {
                                $regex: '.*' + query + '.*',
                                $options: 'i'
                            }
                        }
                    ]
                },
                {
                    available: true
                }
            ]
        })
            .select({
                comments: 0,
                available: 0,
                detail: 0,
                created: 0,
                __v: 0
            })
            .sort({ 'rate.rating': -1 });

        if (post.length === 0) {
            return res.status(200).json({ post: 'No have post' });
        }

        res.status(200).json(post);
    } else {
        const posts = await Post.find().sort({ created: -1 });

        if (posts.length === 0) {
            return res.status(200).json({ post: 'No have post' });
        }

        res.status(200).json(posts);
    }
};

exports.recommend = async (req, res) => {
    const posts = await Post.find({
        $and: [
            {
                'rate.rating': { $gte: 4 }
            },
            {
                available: true
            }
        ]
    })
        .select({ comments: 0, available: 0, detail: 0, created: 0, __v: 0 })
        .sort({ created: -1 });

    let temp = [];
    let result = [];
    for (i = 0; i < posts.length; i++) {
        let random = Math.floor(Math.random() * posts.length);
        if (!temp.some((temp) => temp === random)) {
            result.push(posts[random]);
        } else {
            continue;
        }
        temp.push(random);
        if (result.length === 8) break;
    }

    res.status(200).json(result);
};
