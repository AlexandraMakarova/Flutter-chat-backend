const express = require('express');
const path = require('path');
require('dotenv').config();

//DB config
require('./database/config').dbConnection();

const app = express();

app.use(express.json());

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


//   Public path
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Routes
app.use('/api/login', require('./routes/auth'));



server.listen(process.env.PORT, (err) =>{
    if (err) throw new Error(err);

    console.log('Server runs on port', process.env.PORT);
});