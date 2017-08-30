const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
const cors = require('cors')({origin: true})
var moment = require('moment')
var dorequest = require('request')

exports.up = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		var url = request.query.url
		var okerror = 'error'
		const date = moment().format('DD/MM/YYYY HH:mm')
		if (!url) {
			okerror = 'ok'
			admin.database().ref('/check/self/'+okerror).push(date)
			response.send({code: 200})
		} else {
			dorequest(url, function (error, _response, body) {
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
				var db_url = url.split('.')
				db_url.pop()
				admin.database().ref('/check/'+db_url.pop()+'/'+okerror).push(date)
				response.send(resobject)
			})
		}
	})
})
