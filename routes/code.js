const router = require('express').Router()
	, apis = require('../utils/wxapis')
	, authorize = apis.authorize
	, redirect = apis.redirect
	, STATE = 'newteo'

router.get('/', (req, res)=> {
	const APPID = process.env.WX_APPID
	res.send({
		'codeurl': `${authorize}?appid=${APPID}&redirect_uri=${redirect}&response_type=code&scope=snsapi_userinfo&state=${STATE}#wechat_redirect`
	})
})

module.exports = router
