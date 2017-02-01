// const router = require('express').Router()
// 	, wechatAPI = require('wechat-api')
// 	, appid = process.env.WX_APPID
// 	, appsecret = process.env.WX_SECRET
// 	, wxapi = new wechatAPI(appid, appsecret)
// 	, Requirement = require('../models/Requirement')

// router.get('/news/:id', (req, res)=> {
// 	Requirement.find()
// 	.exec((err, requments)=> {
// 		if(err) return res.send(err)

// 	})
// 	var articles = [{
// 		title: '',
// 		url: ''
// 	},
// 	{
// 		title: '',
// 		url: ''
// 	},
// 	{
// 		title: '',
// 		url: ''
// 	},
// 	{
// 		title: '',
// 		url: ''
// 	},
// 	{
// 		title: '',
// 		url: ''
// 	}]
// 	wxapi.sendNews('openid', articles, (err, txt)=> {
		
// 	})
// })

// module.exports = router