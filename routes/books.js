const express = require('express');
const router = express.Router();
const multer = require('multer');
const Book = require('../models/book');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'static/images/covers/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});

const upload = multer({storage: storage});

router.get('/', (req, res) => {
    Book.find({})
        .then(books => {
            res.json(books);
        });
});
router.get('/:id', (req, res) => {
    Book.findById({_id: req.params.id})
        .then(book => {
            res.json(book);
        });
});
router.post('/', upload.single('cover'), (req, res) => {
    Book.create({
        title: req.body.title,
        author: req.body.author,
        cover: req.file.path.replace(/\\/g, '/'),
        published: req.body.published,
        description: req.body.description,
        comments: [{
            user: req.body.user,
            comment: req.body.comment,
        }],
        likes: [{
            user: req.body.user,
            like: req.body.like,
        }],
    }).then(book => {
        res.json(book);
    });
});
router.put('/:id', (req, res) => {
    Book.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(() => {
            Book.findOne({_id: req.params.id})
                .then(book => {
                    res.json(book);
                });
        });
});
router.delete('/:id', (req, res) => {
    Book.deleteOne({_id: req.params.id})
        .then(book => {
            res.json(book);
        });
});

module.exports = router;