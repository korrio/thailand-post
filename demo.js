"use strict";

var jsonBody = require("body/json");
var express = require('express');
var app = express();

var TrackService = require('./').TrackService;
var trackService = new TrackService({
	lang: "TH"
});

var s = "";

app.set('port', process.env.PORT || 3000);
app.get('/check', function (req, res) {
	 s = req.query.s;

	 trackService.init(function(err, serv) {
	 	serv.getItem(s, function(err, result) {
	 		if (err) {
	 			return console.log(err);
	 		}

	 		//console.log(result.ItemsData);
			res.send(result.ItemsData);
	 	});

		// 	serv.getCountries(function(err, result) {
	 // 		if (err) {
	 // 			return console.log(err);
	 // 		}
		// 	res.send(result);
	 // 		//console.log(result);
		// 	});

		// 	serv.getServices(function(err, result) {
	 // 		if (err) {
	 // 			return console.log(err);
	 // 		}
		//
		// 	res.send(result);
	 // 		//console.log(result);
		// 	});

		// 	serv.getRates("TH", 30, function(err, result) {
	 // 		if (err) {
	 // 			return console.log(err);
	 // 		}
		//
		// 	res.send(result);
	 // 		//console.log(result);
		// 	});

		// 	serv.getRatesByService("1", "TH", 120, function(err, result) {
	 // 		if (err) {
	 // 			return console.log(err);
	 // 		}
		// 	res.send(result);
	 // 		//console.log(result);
		// 	});

	 	// serv.getAllLocations(function(err, result) {
	 	// 	if (err) {
	 	// 		return console.log(err);
	 	// 	}

	 	// 	console.log(result);
	 	// });

	 	// serv.searchLocation("คลอง", function(err, result) {
	 	// 	if (err) {
	 	// 		return console.log(err);
	 	// 	}

	 	// 	console.log(result);
	 	// });

	//  	serv.getNearbyLocations(13.11143, 101.154250, 10, function(err, result) {
	//  		if (err) {
	//  			return console.log(err);
	//  		}
	 //
	// 		res.send(result);
	//  		//console.log(result);
	//  	});

		});
});

app.listen(app.get('port'), function () {
  console.log(`EMS app listening on ${app.get('port')}`);
});
