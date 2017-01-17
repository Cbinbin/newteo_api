const mongoose = require('mongoose')
	, Schema = mongoose.Schema

const imgSchema = new Schema({
	img_url: {
		type: String
	}
})
module.exports = mongoose.model('Img', imgSchema)
