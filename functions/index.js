const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
const cors = require('cors')({origin: true})

exports.up = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		var url = 'self'
		admin.database().ref('/check/'+url).push({date: new Date()})
		if (true) {
			response.send({code: 200})
		} else {
			response.status(500).send({error: 'An error occured'})
		}
	})
})
