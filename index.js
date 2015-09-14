var soap = require('soap');
var CustomSSLSecurity = require('./CustomSSLSecurity');
var dateFormat = require('dateformat');
var crypto = require("crypto");

var AES_KEY = "2847291740385938";

function generateXmlKey(key, data) {
  var cipher = crypto.createCipheriv('aes-128-cbc', key, String.fromCharCode(0).repeat(key.length));
  var crypted = cipher.update(data, 'utf-8', 'base64');
  crypted += cipher.final('base64');

  return crypted;
}

var url = "http://track.thailandpost.co.th/TTSPSW/track.asmx?WSDL";
//var url = "track.wsdl";

var options = {
	endpoint: "https://track.thailandpost.co.th/TTSPSW/track.asmx"
};

var sslOptions = {
	userAgent: "TTPTracker/1.8.2 CFNetwork/711.3.18 Darwin/14.0.0",
	rejectUnauthorized: false,
	strictSSL: false,
	//secureOptions: constants.SSL_OP_NO_TLSv1_2
};

var defaultArgs = {
	user: "ca_sp_ios",
	password: "520tXllm2MXZIGWjL/wchA==",
	lang: "en",
	deviceType: "IOS",
	lastmessage: ""
};

var aesValue = dateFormat(new Date(), "yyyymmddHH");
var publicXmlKey = generateXmlKey(AES_KEY, aesValue);
var publicKeySoapHeader = '<PublicKeySoapHeader xmlns="http://tempuri.org/"><PublicXmlKey>' + publicXmlKey + '</PublicXmlKey></PublicKeySoapHeader>';

soap.createClient(url, options, function(err, client) {
	client.setSecurity(new CustomSSLSecurity(client.lastResponseHeaders, '', '', sslOptions));
	client.addSoapHeader({});
	client.getSoapHeaders()[0] = publicKeySoapHeader;

	var args1 = {
		user: defaultArgs.user,
		password: defaultArgs.password,
		deviceType: defaultArgs.deviceType,
		lastmessage: defaultArgs.lastmessage,
		lang: defaultArgs.lang
	};

	var args2 = {
		user: defaultArgs.user,
		password: defaultArgs.password,
		lang: defaultArgs.lang,
		Barcodes: ""
	};

	client.MessageBoardJson(args1, function(err, result) {
		if (err) {
			return console.log(err);
		}

		client.setSecurity(new CustomSSLSecurity(client.lastResponseHeaders, '', '', sslOptions));
	  	console.log(result);

	  	client.GetItemsJson(args2, function(err, result) {
			if (err) {
				return console.log(err);
			}

			var jsonResult = JSON.parse(result.GetItemsJsonResult);
	  		console.log(jsonResult);
	  	});

	  	client.GetItems(args2, function(err, result) {
			if (err) {
				return console.log(err);
			}

			console.log(result.GetItemsResult.ItemsData.Items);
	  	});
	});
});