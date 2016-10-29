var express = require('express');

var itineraryRouter = require('./itinerary.router');
var activityRouter = require('./activity.router');
var searchRouter = require('./search.router');
var authRouter = require('./auth.router');
var paymentRouter = require('./payment.router')
<<<<<<< HEAD
var flightRouter = require('./flight.router');
=======
var chatsRouter = require('./chats.router')
>>>>>>> 9567fcfa4bad106eba7fd5238f268c10e9c35e98

var router = express.Router();

router.use('/itinerary', itineraryRouter);
router.use('/activity', activityRouter);
router.use('/search', searchRouter);
router.use('/auth', authRouter);
router.use('/payment', paymentRouter)
<<<<<<< HEAD
router.use('/flight', flightRouter);
=======
router.use('/chats', chatsRouter)
>>>>>>> 9567fcfa4bad106eba7fd5238f268c10e9c35e98

module.exports = router;
