const router = require('express').Router()
	, crypto = require('crypto')

// router.get('/', (req, res)=> {
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

router.post('/', (req, res, next)=> {
	var message = req.weixin
		, member1 = process.env.CJB
	console.log(message)
	if(message.FromUserName === member1) { 	//成员验证
		switch(message.EventKey) {
			case '需求' :
			{
					res.reply([{ 
						title: '查看需求', 
						picurl: 'http://383c6c93.ngrok.io/storage/index.jpeg',
						url: 'http://383c6c93.ngrok.io/xuqiu'
					}])
			} break
		}
	} else {
		res.reply('枣啊，你再唔枣丢你螺母')
	}
})

module.exports = router
