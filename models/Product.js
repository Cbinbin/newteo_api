const mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, Partner = require('./Partner')
	, Img = require('./Img')

const productSchema = new Schema({
	owner: {
		type: Schema.Types.ObjectId, 
		ref: 'Partner'
	},
	title: {  //项目名称
		type: String
	},
	online: {
		type: Boolean
	},
	url: {
		type: String
	},
	img: [{  //项目图片
		type: Schema.Types.ObjectId, 
		ref: 'Img'
	}],
	description: {  //项目描述
		type: String
	},
	create_time: {  //创建时间
		type: Date,
		default: Date.now
	}
})
module.exports = mongoose.model('Product', productSchema)
