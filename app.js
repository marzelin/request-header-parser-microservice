var express = require('express');

var ip = process.env.IP;
var port = process.env.PORT;
var app = express();

app.get('/', function getCb(req, res) {

  var headers = req.headers;

  var ipaddress = headers['x-forwarded-for'];

  var acceptLanguageField = headers['accept-language'];
  var firstValueRegExp = /[^,]*/
  var language = acceptLanguageField.match(firstValueRegExp)[0];

  var userAgent = headers['user-agent'];
  var valueInParenthesesRegExp = /(\()([^)]*)(\))/;
  var software = userAgent.match(valueInParenthesesRegExp)[2];

  var retObj = {
    ipaddress: ipaddress,
    language: language,
    software: software
  };

  res.json(retObj);
});

app.listen(port, ip);
