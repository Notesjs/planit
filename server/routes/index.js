var express = require('express');

var itineraryRouter = require('./itinerary.router');
var activityRouter = require('./activity.router');
var searchRouter = require('./search.router');
var authRouter = require('./auth.router');
var paymentRouter = require('./payment.router')
var chatsRouter = require('./chats.router')

var router = express.Router();

router.use('/itinerary', itineraryRouter);
router.use('/activity', activityRouter);
router.use('/search', searchRouter);
router.use('/auth', authRouter);
router.use('/payment', paymentRouter)
router.use('/chats', chatsRouter)

module.exports = router;
