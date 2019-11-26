const express = require('express');
const fs = require('fs');
const raw = fs.readFileSync('data/words.json');
const words = JSON.parse(raw);
const mongoose = require('mongoose');
const Essay = mongoose.model('Essay');
let router = express.Router();
router.get('/', function (req, res) {
    res.render('layouts/upload.hbs', { viewTitle: "Submit Essay" });
});

router.post('/', function (req, res) { insert(req, res) });

function insert(req, res) {
    var essay = new Essay();
    essay.name = req.body.name.trim();
    essay.essay = req.body.essay.trim();
    let grade = computeGrade(req.body.essay.trim())
    essay.grade = grade;
    essay.save(function (err, doc) {
        if (err)
            console.log(`Error ${err}`);
        else
            res.render('layouts/grade.hbs', { grade: grade });
    });
}
/*
Start the score at 100 points.
        -1 deduction for spelling and nasty no nos
        -2 for contractions
        -3 for N2S
        -5 for each word over the maximum word count (250 words)
        -50 if they fall below the minimum word count (100 words)
        -200 if you detect plagiarism (you can choose what defines "plagiarism", this is optional)
        The minimum possible grade is -100 points.
 */
function computeGrade(essay) {
    essay = essay.trim();
    let nnn = ['very', 'thing', 'always', 'never', 'like', 'lot', 'good', 'bad', 'stuff', 'nice', 'really', 'many', 'i', 'you'];
    let score = 100;
    //Checks length
    if (essay.length < 100)
        score -= 50;
    if (essay.length > 250)
        score -= (essay.length - 250) * 5;
    essayArray = essay.split(' ');
    // NNN & Checks if is a word
    for (let i = 0; i < essayArray.length; i++) {
        let element = essayArray[i];
        element = element.toLowerCase();
        if (element.includes(",") || element.includes("."))
            element = element.substring(0, element.length - 1);
        if (words[element] != 1 || nnn.includes(element))
            score--;
        if (element.includes("'"))
            score -= 2;
    };
    //N2SSWTSW
    let wordset = new Set();
    const sentences = essay.split('.');
    for(let i = 0;i<sentences.length;i++) 
    {
        let element = sentences[i].trim().split(' ')[0];
        if(wordset.has(element))
            score-=3;
        console.log(sentences.length);
        console.log(element);
        wordset.add(element);
    }
    console.log(score);
    return score > -100 ? score : -100;
}
module.exports = router;

