const router = require('express').Router()
	, wechatAPI = require('wechat-api')
	, Requirement = require('../models/Requirement')

router.get('/news/:id', (req, res)=> {
	var appid = process.env.WX_APPID
		, appsecret = process.env.WX_SECRET
		, wxapi = new wechatAPI(appid, appsecret)
		, openid = req.params.id
	Requirement.find()
	.exec((err, requments)=> {
		if(err) return res.send(err)
	})
	var articles = [{
			title: '1',
			picurl: '',
			url: ''
		},
		{
			title: '2',
			url: ''
		},
		{
			title: '3',
			url: ''
		},
		{
			title: '4',
			url: ''
		},
		{
			title: '5',
			url: ''
		}]
	wxapi.sendNews(openid, articles, (err, txt)=> {
		if(err) return res.send(err)
		window.close()
	})
})

module.exports = router