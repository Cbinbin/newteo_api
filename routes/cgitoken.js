const router = require('express').Router()
	, request = require('superagent')
	, apis = require('../utils/wxapis')
	, cgitoken = apis.cgitoken

router.get('/', (req, res)=> {
	const APPID = process.env.WX_APPID
		, SECRET = process.env.WX_SECRET
		, CODE = req.query.code
	request
	.get(`${cgitoken}?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`)
	.end((err, rat)=> {
		if(err) res.send(err)
		res.send(JSON.parse(rat.text)['access_token'])
	})
})

module.exports = router
