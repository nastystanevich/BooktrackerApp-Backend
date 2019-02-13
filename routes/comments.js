const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

router.post('/:userid/:bookid', (req, res) => {
    Comment.create({
        user: req.params.userid,
        book: req.params.bookid,
        comment: req.body.comment,
    }).then(comment => {
        res.json(comment);
    });
});

module.exports = router;