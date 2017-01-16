const router = require('express').Router()
	, crypto = require('crypto')

router.get('/', (req, res)=> {
	var signature = req.query.signature
		, timestamp = req.query.timestamp
		, nonce = req.query.nonce
		, echostr = req.query.echostr
		, token = gagaga
		, sha1 = crypto.creatHash('sha1')
		sskey = [token, timestamp, nonce].sort().join('')
	
})

module.exports = router
