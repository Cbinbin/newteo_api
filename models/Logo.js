const mongoose = require('mongoose')
	, Schema = mongoose.Schema

const logoSchema = new Schema({
	logo_url: {
		type: String
	}
})
module.exports = mongoose.model('Logo', logoSchema)
