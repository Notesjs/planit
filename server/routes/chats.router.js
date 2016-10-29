var express = require('express')
var chatsController = require('../controllers').chatsController;
var chatsRouter = express.Router();

chatsRouter.get('/', chatsController.GET);

module.exports = chatsRouter;
