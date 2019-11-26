const express = require('express');
const mongoose = require('mongoose');
const Essay = mongoose.model('Essay');
let router = express.Router();
let count = 0;
let doc = null;
router.get('/', (req, res) => {
    Essay.find((err, docs) => {
        doc = docs;
        if (!err)
            res.render("layouts/admin", { list: docs });
        else
            console.log(`Error: ${err}`);
    });
});
router.post('/', (req, res) => {
    count = 0;
    if (doc == null)
        res.redirect('/');
    for (let i = 0; i < doc.length; i++) {
        Essay.findById(doc[i]._id, (err, obj) => {
            if (err)
                console.log(`Error: ${err}`);
            else {
                if (obj) {
                    obj.essay = req.body.essay[i].trim();
                    let a = parseInt(req.body.grade[i]);
                    obj.grade = a > -100 ? (a <= 100 ? a : 100) : -100;
                    obj.save((error, newObj) => {
                        if (error)
                            console.log(`Error: ${error}`);
                        count++;
                        if (count == doc.length)
                            res.redirect('/admin');
                    });
                }
            }
        });
    }
});
module.exports = router;