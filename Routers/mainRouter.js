const express = require('express');
const app = express();
const {templatesRouter} = require('./templatesRouter');
const {clientRouter} = require('./clientRouter');


app.use(('/', clientRouter));
app.use(('/api/templates', templatesRouter));


module.exports ={
    app
}


