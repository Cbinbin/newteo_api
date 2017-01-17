const mongoose = require('mongoose')
	, Schema = mongoose.Schema

const requirementSchema = new Schema({
	name: {
		type: String
	},
	phone: {
		type: Number,
		min: 10000000000,
		max: 19999999999
	},
	company: {
		type: String
	}, 
	info: {
		type: String
	},
	create_time: {		//创建时间
		type: Date,
		default: Date.now
	}
})
module.exports = mongoose.model('Requirement', requirementSchema)
