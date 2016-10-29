var path = require('path');
var express = require('express');
require('dotenv').config();
var request = require('request');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var rp = require('request-promise');
var router = require('./routes');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var db = require('./db').db;
var chatdb = require('./db/chatdb.js')

var port = process.env.PORT || 8000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../client')));

// Handle known routes
app.use('/api', router);
// app.use('/api', function(req, res){
//   res.send('test');
// })

// Display error 404 for unknown routes
app.use(function(req, res) {
  res.send('Error 404: Page not found');
});

//socketio calls
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    chatdb.create({name: msg.name, message: msg.message, uuid: msg.uuid})
    io.emit('chat message server', msg)
    console.log('chat message', msg);
  })
});

http.listen(port, function(){
  console.log('Server started: http://localhost:' + port + '/')
})
