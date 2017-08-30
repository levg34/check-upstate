const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
const cors = require('cors')({origin: true})
var moment = require('moment')

exports.up = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		var url = 'self'
		const date = moment().format('DD/MM/YYYY HH:mm')
		admin.database().ref('/check/'+url).push({date: date})
		if (true) {
			response.send({code: 200})
		} else {
			response.status(500).send({error: 'An error occured'})
		}
	})
})
