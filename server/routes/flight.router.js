var express = require('express');
var flightRouter = express.Router();
var flightController = require('../controllers').flightController;

flightRouter.post("/", flightController.POST)

module.exports = flightRouter;