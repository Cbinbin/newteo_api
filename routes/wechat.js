const router = require('express').Router()
	, crypto = require('crypto')
	, Requirement = require('../models/Requirement')
	, host = require('../utils/hosturl')

// router.get('/', (req, res)=> {
// 	var signature = req.query.signature
// 		, timestamp = req.query.timestamp
// 		, nonce = req.query.nonce
// 		, echostr = req.query.echostr
// 		, token = process.env.WX_TOKEN
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
	// if(message.FromUserName === member1) { 	//成员验证
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
				},
				{ 
					title: '1', 
					url: ``
				},
				{ 
					title: '2', 
					url: ``
				},
				{ 
					title: '3', 
					url: ``
				},
				{ 
					title: '4', 
					url: ``
				},
				{ 
					title: '5', 
					url: ``
				},
				{ 
					title: '下一页', 
					url: ``
				}])
			} else {
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
	// } else {
	// 	res.reply('非管理员暂不提供服务')
	// }
})

module.exports = router
