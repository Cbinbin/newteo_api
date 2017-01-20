const mongoose = require('mongoose')
	, moment = require('moment')
	, Schema = mongoose.Schema

const requirementSchema = new Schema({
	name: {
		type: String
	},
	phone: {
		type: Number,
		min: 13000000000,
		max: 18999999999
	},
	company: {
		type: String
	}, 
	info: {
		type: String
	},
	create_time: {		//创建时间
		type: String,
		default: moment().format('YYYY年MM月DD日   hh:mm:ss a')
	}
})
module.exports = mongoose.model('Requirement', requirementSchema)
