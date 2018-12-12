const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const rc = require('./api/rc');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/rc',rc);


module.exports = app;