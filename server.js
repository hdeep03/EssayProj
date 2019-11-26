const express = require('express');
const path = require('path');
const handle = require('express-handlebars');
const parser = require('body-parser');
require('./models/db');
const clientController = require('./control/clientController');
let app = express();
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

app.listen(4000, function(){console.log('Running on port 4000');});
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', handle({extname:'hbs', defaultLayout: 'main'}));
app.set('view engine', 'hbs');

app.use('/upload', clientController);


