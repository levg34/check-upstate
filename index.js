var express = require('express') 
var app = express() 
var moment = require('moment')
var request = require('request')
var purl = require('url')

var errorCodes = [404,500]
var dangerErrors = ['ENOTFOUND','EAI_AGAIN']

app.set('port', (process.env.PORT || 5000)) 
app.use(express.static(__dirname + '/public'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/view/index.html')
})

app.get('/up', function (req, res) {
	var url = req.query.url
	//const date = moment().format('DD/MM/YYYY HH:mm')
	if (!url) {
		res.send({code: 200,color:'success'})
	} else {
		if (!url.startsWith('http')) {
			url='http://'+url
		}
		request(url, function (error, _response, body) {
			var resobject = {url:url,color:'info'}
			if (error) {
				resobject.error = error
				if (dangerErrors.indexOf(error.code) != -1) {
					resobject.color = 'danger'
				}
			}
			if (_response) {
				resobject.code = _response.statusCode
				resobject.url = _response.request.href
				if (purl.parse(resobject.url).host.indexOf(purl.parse(url).host)==-1) {
					resobject.redirect = true
				}
				if (Math.floor(resobject.code/100) == 2) {
					resobject.color = 'success'
				} else if (errorCodes.indexOf(resobject.code)!=-1) {
					resobject.color = 'danger'
				} else {
					resobject.color = 'warning'
				}
			}
			res.send(resobject)
		})
	}
})

app.get('/redirect', function (req, res) {
	var url = req.query.url
	//const date = moment().format('DD/MM/YYYY HH:mm')
	if (!url) {
		res.status(400).send({error:'Missing parameter: URL.'})
	} else {
		if (!url.startsWith('http')) {
			url='http://'+url
		}
		var resobject = {url:url}
		request(url, {
			method: 'HEAD',
			followAllRedirects: true
		}, function(error, response, body) {
			if (error) {
				resobject.error = error
			}
			if (response) {
				var return_url = response.request.href
				if (purl.parse(return_url).host.indexOf(purl.parse(url).host)==-1) {
					resobject.redirect = true
				}
				resobject.r_url = return_url
			}
			res.send(resobject)
		})
	}
})

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'))
})