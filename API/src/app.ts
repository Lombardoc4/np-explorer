import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { checkApiKey, createIndex } from '../lib/redis';

const app = express();

// Middleware example
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

app.use('/createIndex', (req, res, next) => {
    createIndex();
    next();
});

app.use('/*', (req, res, next) => {
    const apiKey = req.headers.apiKey;
    
    if (!apiKey || !checkApiKey(apiKey)) {
        return res.status(401).send('Unauthorized');
    }
    
    next();
    
});

// Get example
app.get('/*', (req, res) => {
    res.send('Hello World!');
});


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});