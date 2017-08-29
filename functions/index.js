const functions = require('firebase-functions')
const cors = require('cors')({origin: true})

exports.up = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		if (true) {
			response.send({code: 200})
		} else {
			response.status(500).send({error: 'An error occured'})
		}
	})
})
