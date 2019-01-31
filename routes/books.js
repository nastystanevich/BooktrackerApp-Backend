const express = require('express');
const router = express.Router();
const Book = require('../book');

router.get("/", (req, res) => {
    Book.find({})
        .then(book => {
            res.send(book);
        });
});
router.get("/:id", (req, res) => {
    Book.findById({_id: req.params.id})
        .then(book => {
            res.send(book);
        });
})
router.post("/", (req, res) => {
    Book.create(req.body)
        .then(book => {
            res.send(book);
        });
});
router.put("/:id", (req, res) => {
    Book.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(() => {
            Book.findOne({_id: req.params.id})
                .then(book => {
                    res.send(book);
                });
        });
});
router.delete("/", (req, res) => {
    Book.deleteMany({})
        .then(book => {
            res.send(book);
        });
});
router.delete("/:id", (req, res) => {
    Book.deleteOne({_id: req.params.id})
        .then(book => {
            res.send(book);
        });
});

module.exports = router;