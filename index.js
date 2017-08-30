var express = require('express') 
var app = express() 
var moment = require('moment')
var request = require('request')

app.set('port', (process.env.PORT || 5000)) 
app.use(express.static(__dirname + '/public')) 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/up', function (req, res) {
	var url = req.query.url
	var okerror = 'error'
	const date = moment().format('DD/MM/YYYY HH:mm')
	if (!url) {
		okerror = 'ok'
		res.send({code: 200})
	} else {
		request(url, function (error, _response, body) {
			var resobject = {}
			if (error) {
				okerror = 'error'
				resobject.error = error
				if (error.code == 'ENOTFOUND') {
					resobject.code = 404
				}
			}
			if (_response) {
				resobject.code = _response.statusCode
				if (resobject.code == 200) {
					okerror = 'ok'
				}
			}
			res.send(resobject)
		})
	}
})

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'))
})