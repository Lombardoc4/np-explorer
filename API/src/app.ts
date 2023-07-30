import * as dotenv from 'dotenv';
import cors from 'cors';
const fetch = require('node-fetch');
// import fetch from 'node-fetch';

dotenv.config();

import express from 'express';
import { checkApiKey, createIndex, createPark, getAllParks } from '../lib/redis';

const app = express();

// Middleware example
app.use(cors())
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});


// Create Index?? Not sure functionality
app.use('/createIndex', (req, res, next) => {
    createIndex();
    next();
});

// Check API Key
app.use('/*', (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    checkApiKey(apiKey)
    .then((value: boolean) => {
        if (!value) {
            res.status(401).send('Unauthorized');
        } else {
            next();
        }
    });
    
    
});

// Get example
// app.get('/*', (req, res) => {
//     res.send('Hello World!');
// });

app.get('/parks', (req, res) => {
    const apiKey = req.headers['x-api-key'];
    getAllParks(apiKey)
    .then((parks: any) => {
        console.log('parks', parks);
        
        if (parks.length > 0) {
            res.send(parks);
            return;
        }
        
        
    });
        
});


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});