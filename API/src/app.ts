import fs from 'fs';

import  { hello } from './helper.js';

import express from 'express';

const app = express();

// Middleware example
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

app.use('/request', (req, res, next) => {
    console.log('Request Type:', req.method);
    next();
});

// Get example
app.get('/*', (req, res) => {
    res.send('Hello World!');
});


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});