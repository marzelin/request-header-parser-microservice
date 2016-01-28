var express = require('express');

var ip = process.env.IP;
var port = process.env.PORT;
var app = express();

app.get('/', function getCb(req, res) {
  var ip6and4 = req.ip;
  var ip4regExp = /(?:\d{1,3}\.){3}\d{1,3}/;
  var ip = ip6and4.match(ip4regExp)[0];

  var headers = req.headers;

  var acceptLanguageField = headers['accept-language'];
  var firstValueRegExp = /[^,]*/
  var language = acceptLanguageField.match(firstValueRegExp)[0];

  var userAgent = headers['user-agent'];
  var valueInParenthesesRegExp = /(\()([^)]*)(\))/;
  var software = userAgent.match(valueInParenthesesRegExp)[2];

  var retObj = {
    ipaddress: ip,
    language: language,
    software: software
  }

  res.json(retObj);
});

app.listen(port, ip);
