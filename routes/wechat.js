const router = require('express').Router()
	, crypto = require('crypto')

// router.post('/', (req, res)=> {
// 	var signature = req.query.signature
// 		, timestamp = req.query.timestamp
// 		, nonce = req.query.nonce
// 		, echostr = req.query.echostr
// 		, token = 'gagaga'
// 		, sha1 = crypto.createHash('sha1')
// 		, sha1Str = sha1.update([token, timestamp, nonce].sort().join('')).digest('hex')
// 	res.writeHead(200, {'Content-Type': 'text/plain'})
// 	res.end((sha1Str === signature) ? echostr : '')
// 	return res
// })

router.use('/', (req, res, next)=> {
	var message = req.weixin
		, member1 = process.env.CJB
	console.log(message)
	if(message.ToUserName === member1) { 	//成员验证
		if(message.Content === '测试') {
			res.reply({
				type: 'text',
				content: '某得倾'
			})
		} else {
			res.reply('hehe')
		}
	} else {
		res.reply('枣啊，你再唔枣丢你螺母')
	}
})

module.exports = router
