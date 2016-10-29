var express = require('express');
var app = express();
var Chats = require('../db/chatdb.js')
var chatsController = {}

chatsController.GET = function(req, res) {
  console.log('wer are in chatsctrl server');
  Chats.find({})
  .then(function(result){
    console.log('.then results', result);
    res.status(200).json(result)
  })
};

module.exports = chatsController
