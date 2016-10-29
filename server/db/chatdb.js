const mongoose = require('mongoose');

mongoose.connect('mongodb://demo:demo@ds137267.mlab.com:37267/planitchats')

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'))
db.once('open', function(){
  console.log('Mongoose connected');
})

var ChatsSchema = new mongoose.Schema({
  name: String,
  message: String,
  uuid: String
}, {collection: 'ChatsCollection'});

module.exports = mongoose.model('Chats', ChatsSchema)
