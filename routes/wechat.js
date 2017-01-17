const router = require('express').Router()
	, crypto = require('crypto')
	, wechat = require('wechat')

router.get('/changeurl', (req, res)=> {
	var signature = req.query.signature
		, timestamp = req.query.timestamp
		, nonce = req.query.nonce
		, echostr = req.query.echostr
		, token = 'gagaga'
		, sha1 = crypto.createHash('sha1')
		, sha1Str = sha1.update([token, timestamp, nonce].sort().join('')).digest('hex')
    res.writeHead(200, {'Content-Type': 'text/plain'})
	res.end((sha1Str === signature) ? echostr : '')
	return res
})

router.get('/', (req, res)=> {

})

module.exports = router
