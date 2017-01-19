const router = require('express').Router()
	, request = require('superagent')
	, apis = require('../utils/wxapis')
	, actoken = apis.actoken

router.get('/', (req, res)=> {
	const APPID = process.env.WX_APPID
		, SECRET = process.env.WX_SECRET
		, CODE = req.query.code
	request
	.get(`${actoken}?appid=${APPID}&secret=${SECRET}&code=${CODE}&grant_type=authorization_code`)
	.end((err, rat)=> {
		if(err) res.send(err)
		console.log(JSON.parse(rat.text)['access_token'])
		res.send(rat)
	})
})

module.exports = router
