var rp = require('request-promise');
var flightController = {}

flightController.POST = (req,res) => {

	var url = "http://terminal2.expedia.com:80/x/mflights/search?departureDate=2016-12-25&returnDate=2016-12-30&departureAirport="+req.body.departureCity+"&arrivalAirport="+req.body.arrivalCity+"&maxOfferCount=20&apikey="+ process.env.expedia_api_key;
	var options = {
	    method: "GET",
	    uri: url,
	    json: true
	};
	rp(options)
	.then((body)=>{
		console.log("body", body)
		res.send(body)
	})
	.catch(err=>{
		console.log("error in flight", err)
	})

}

module.exports = flightController;

