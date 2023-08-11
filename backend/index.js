const express = require('express');
const app = express();
const router = require('./routes/routes');
const serverless = require('serverless-http');

app.use(express.json());
app.use('/', router);

exports.handler = serverless(app);