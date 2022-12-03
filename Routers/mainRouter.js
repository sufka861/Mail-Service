const express = require('express');

const app = express();
const { templatesRouter } = require('./templatesRouter');
const { clientRouter } = require('./clientRouter');

app.use('/api/templates', templatesRouter);
app.use('/', clientRouter);

module.exports = {
  app,
};
