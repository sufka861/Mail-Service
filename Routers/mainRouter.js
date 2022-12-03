const express = require('express');
const app = express();
const {templatesRouter} = require('./templatesRouter');
const {clientRouter} = require('./clientRouter');
const {mailRouter} = require('./mailRouter');

app.use('/api/templates', templatesRouter);
app.use('/api/mail', mailRouter);
app.use('/', clientRouter);

module.exports = {
    app
}


