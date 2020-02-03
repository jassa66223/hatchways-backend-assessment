// server

// variables
const express = require('express');
const env = require('./environment');
const config = require('./config')
const app = express()
const compression = require('compression')
var helmet = require('helmet')

// Import Routes
const ping = require('./routes/ping');
const posts = require('./routes/posts');

// Middleware
app.use(compression());
app.use(helmet())
app.disable('x-powered-by')
app.use(express.urlencoded(env.urlencoded));
app.use(express.json(env.jsonConf));
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:4200");
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header("Access-Control-Allow-Methods", "*");
//     res.header("Access-Control-Allow-Headers", "*");
//     next();
// });

// Routes 
app.use('/api/ping', ping);
app.use('/api/posts', posts);

// listening
app.listen(config.port || process.env.PORT, ()=> {
    console.log(`Listening to the port ${env.port || process.env.PORT}...`);
})
