var express = require('express');
var app = express();
var Chats = require('../db/chatdb.js')
var chatsController = {}

chatsController.GET = function(req, res) {
  Chats.find({
    uuid: req.query.uuid
})
  .then(function(result){
    console.log('.then results', result);
    res.status(200).json(result)
  })
};

module.exports = chatsController
