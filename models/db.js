const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/EssayDB', { useNewUrlParser: true }, function (err) {
    if (!err) { console.log('DB connection sucessful'); }
    else { console.log(`Error: ${err}`); }
});

require('./essayModel.js');
