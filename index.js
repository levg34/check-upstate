var express = require('express') 
var app = express() 
const cors = require('cors')({origin: true})
var moment = require('moment')
var request = require('request')

app.set('port', (process.env.PORT || 5000)) 
app.use(express.static(__dirname + '/public')) 

app.get('/up', function (req, res) {
	cors(req, res, () => {
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
})

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'))
})