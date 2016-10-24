var PossibleActivities = require('../db').PossibleActivities;
var PossibleExpedia = require('../db').PossibleExpedia;
var yelpSearch = require('../helpers/activityHelper').yelpSearch;
var rp = require('request-promise');

var activityController = {};

activityController.GET = function(req, res) {
  // console.log('inside the activity controller.GET', req);
  PossibleActivities
    .findAll({
      where: { uuid: req.query.uuid }
    })
    .then(function(activity) {
      res.status(200).json(activity);
    })
    .catch(function(err) {
      res.status(418).send(err);
    });
};

activityController.POST = function(req, res) {
  // console.log('inside the activity controller.POST');
  // make API request to Yelp
  // console.log('req in activityController', req);
  yelpSearch(req.locationName)
    .then(function(searchResults) {
      //saves search results to the database;
      searchResults.forEach(function(searchResult) {
        searchResult['uuid'] = req.uuid;
      });
      console.log(searchResults, 'searchResults');
      PossibleActivities.bulkCreate(searchResults);
    })
    .then(function(savedActivities) {
      res.status(200).json(savedActivities);
    })
    .catch(function(err) {
      console.log('Error in posting possible activities: ', err)
      res.status(418).send(err);
    });
};

activityController.POSTEXPEDIA = function(req, res) {
  // console.log('Posting from Expedia!', req)
  var url = "http://terminal2.expedia.com/x/activities/search?location=" +
  req.locationName + "&apikey=OPwVzGiq1hnLYYTDwQI2Uqjt5OPrt767";
  var options = {
    method: "POST",
    uri: url,
    json: true
  }
  rp(options)
    .then(function(body) {
      body.activities.forEach(function(expediaResult) {
        expediaResult['uuid'] = req.uuid;
      })
      // slicing possible options to top 20, will refactor later for multiple pages
      PossibleExpedia.bulkCreate(body.activities.slice(0,20));
    });
};

module.exports = {
  activityController: activityController
};
