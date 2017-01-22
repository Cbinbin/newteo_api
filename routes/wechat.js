const router = require('express').Router()
	, crypto = require('crypto')
	, Requirement = require('../models/Requirement')
	, host = require('../utils/hosturl')

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
		if(message.MsgType === 'event') {
			switch(message.EventKey) {
				case '需求' :
				{
					res.reply([{ 
						title: '查看需求', 
						picurl: `${host.wx}storage/index.jpeg`,
						url: `${host.wx}xuqiu`
					}])
				} break
			}
		} else if(message.MsgType === 'text') {
			if(message.Content === '需求') {
				res.reply([{ 
					title: '查看需求', 
					picurl: `${host.wx}storage/index.jpeg`,
					url: `${host.wx}xuqiu`
				}])
			} 
			// else if(message.Content === '删除') {
			// 	Requirement.findOne({_id: ''})
			// 	.exec((err, requment)=> {
			// 		if(err) return res.reply('噢，出错鸟')
			// 		else if(!requment) return res.reply('ID输入有误！')
			// 		res.reply({ 
			// 			type: 'text', 
			// 			content: `${requment}\n你确定删除这个？`
			// 		})
			// 	})
			// } 
			else {
				res.reply('hehe')
			}
		} else if(message.MsgType === 'voice') {
			if(message.Recognition === '需求') {
				res.reply([{ 
					title: '查看需求', 
					picurl: `${host.wx}storage/index.jpeg`,
					url: `${host.wx}xuqiu`
				}])
			} else {
				res.reply('hehe')
			}
		}
	} else {
		res.reply('枣啊，再唔枣丢你螺母')
	}
})

module.exports = router
