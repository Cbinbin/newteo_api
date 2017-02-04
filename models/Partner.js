const mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, Product = require('./Product')

const partnerSchema = new Schema({
	logo: {  //合作商Logo
		type: String
	}, 
	name: {  //合作商名称
		type: String
	},
	introduction: {  //合作商介绍
		type: String
	},
	description: {  //描述
		type: String
	},
	products: [{  //合作项目
		type: Schema.Types.ObjectId, 
		ref: 'Product'
	}],
	create_time: {  //创建时间
		type: Date,
		default: Date.now
	}
})
module.exports = mongoose.model('Partner', partnerSchema)
