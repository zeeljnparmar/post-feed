const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => res.send('Social Post Module API. See /api'));

module.exports = app;
