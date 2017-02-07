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
		, openid = message.FromUserName
		, member1 = process.env.CJB
		, array_rqId = []
		, array_rqm = []
		, ye
		, cn = ['\u4E00', '\u4E8C', '\u4E09', '\u56DB', '\u4E94', '\u516D', '\u4E03', '\u516B', '\u4E5D', '\u5341']
		, xq = /\u9700\u6C42/g			// 9700 (需)    6C42 (求)
		, djy = /\u7B2C+\d{1,2}|\u4E00|\u4E8C|\u4E09|\u56DB|\u4E94|\u516D|\u4E03|\u516B|\u4E5D|\u5341+\u9875/g

	console.log(message)
	// if(message.FromUserName === member1) {   //成员验证
		if(message.MsgType === 'event') {
			switch(message.EventKey) {
				case '需求' :
				{
					res.reply([{ 
						title: '查看需求', 
						picurl: `${host.wx}storage/index2.jpg`,
						url: `${host.wx}xuqiu`
					}])
				} break
			}


		} else if(message.MsgType === 'text') {
			Requirement.find({ }, {__v:0})
			.exec((err, requments)=> {
				if(err) return res.send(err)
				requments.map((item)=> {
					array_rqId.push(item._id)
					array_rqm.push(`姓名:   ${item.name}, 
手机号:   ${item.phone}, 
公司名:   ${item.company}, 
描述:   ${item.info}, 
时间:   ${item.create_time}`
					)
				})
				//
				if((array_rqm.length%5) > 0) { ye = parseInt(array_rqm.length/5) + 1 }
				else ye = parseInt(array_rqm.length/5)
				//
				if(xq.test(message.Content)) {
					res.reply([{ 
						title: '查看需求', 
						picurl: `${host.wx}storage/index2.jpg`,
						url: `${host.wx}xuqiu`
					},
					{ 
						title: `${array_rqm[0]}`, 
						url: `${host.wx}requirement/backstage/${array_rqId[0]}`
					},
					{  
						title: `${array_rqm[1]}`, 
						url: `${host.wx}requirement/backstage/${array_rqId[1]}`
					},
					{ 
						title: `${array_rqm[2]}`, 
						url: `${host.wx}requirement/backstage/${array_rqId[2]}`
					},
					{ 
						title: `${array_rqm[3]}`, 
						url: `${host.wx}requirement/backstage/${array_rqId[3]}`
					},
					{ 
						title: `${array_rqm[4]}`, 
						url: `${host.wx}requirement/backstage/${array_rqId[4]}`
					},
					{ 
						title: `                              共${ye}页`, 
						url: ``
					},
					{ 
						title: `                              下一页`, 
						url: `${host.wx}wxsend/news/${openid}`
					}])
				} else if(djy.test(message.Content)) {
					var want = String(message.Content.match(/\u7B2C\d{1,2}\u9875/g))    //提取
						, page = String(want.match(/\d{1,2}/g))
					if(page <= ye) {
						res.reply([{ 
							title: '查看需求', 
							picurl: `${host.wx}storage/index2.jpg`,
							url: `${host.wx}xuqiu`
						},
						{ 
							title: `${array_rqm[(page-1)*5]}`, 
							url: `${host.wx}requirement/backstage/${array_rqId[(page-1)*5]}`
						},
						{  
							title: `${array_rqm[(page-1)*5+1]}`, 
							url: `${host.wx}requirement/backstage/${array_rqId[(page-1)*5+1]}`
						},
						{ 
							title: `${array_rqm[(page-1)*5+2]}`, 
							url: `${host.wx}requirement/backstage/${array_rqId[(page-1)*5+2]}`
						},
						{ 
							title: `${array_rqm[(page-1)*5+3]}`, 
							url: `${host.wx}requirement/backstage/${array_rqId[(page-1)*5+3]}`
						},
						{ 
							title: `${array_rqm[(page-1)*5+4]}`, 
							url: `${host.wx}requirement/backstage/${array_rqId[(page-1)*5+4]}`
						},
						{ 
							title: `           第${page}页                           共${ye}页`, 
							url: ``
						}])
					} else {
						res.reply(`总共只有${ye}页`)
					}
				} else {
					res.reply('hehe')
				}
			})


		} else if(message.MsgType === 'voice') {
			Requirement.find({ }, {__v:0})
			.exec((err, requments)=> {
				if(err) return res.send(err)
				requments.map((item)=> {
					array_rqId.push(item._id)
					array_rqm.push(`姓名:   ${item.name}, 
手机号:   ${item.phone}, 
公司名:   ${item.company}, 
描述:   ${item.info}, 
时间:   ${item.create_time}`
					)
				})
				//
				if((array_rqm.length%5) > 0) { ye = parseInt(array_rqm.length/5) + 1 }
				else ye = parseInt(array_rqm.length/5)
				//
				if(xq.test(message.Recognition)) {
					res.reply([{ 
						title: '查看需求', 
						picurl: `${host.wx}storage/index2.jpg`,
						url: `${host.wx}xuqiu`
					},
					{ 
						title: `${array_rqm[0]}`, 
						url: `${host.wx}requirement/backstage/${array_rqId[0]}`
					},
					{  
						title: `${array_rqm[1]}`, 
						url: `${host.wx}requirement/backstage/${array_rqId[1]}`
					},
					{ 
						title: `${array_rqm[2]}`, 
						url: `${host.wx}requirement/backstage/${array_rqId[2]}`
					},
					{ 
						title: `${array_rqm[3]}`, 
						url: `${host.wx}requirement/backstage/${array_rqId[3]}`
					},
					{ 
						title: `${array_rqm[4]}`, 
						url: `${host.wx}requirement/backstage/${array_rqId[4]}`
					},
					{ 
						title: `                              共${ye}页`, 
						url: ``
					}])
				} else if(djy.test(message.Recognition)) {
					var want = String(message.Recognition.match(/\u7B2C\d{1,2}\u9875/g))    //提取
						, page = String(want.match(/\d{1,2}/g))
					if(page <= ye) {
						res.reply([{ 
							title: '查看需求', 
							picurl: `${host.wx}storage/index2.jpg`,
							url: `${host.wx}xuqiu`
						},
						{ 
							title: `${array_rqm[(page-1)*5]}`, 
							url: `${host.wx}requirement/backstage/${array_rqId[(page-1)*5]}`
						},
						{  
							title: `${array_rqm[(page-1)*5+1]}`, 
							url: `${host.wx}requirement/backstage/${array_rqId[(page-1)*5+1]}`
						},
						{ 
							title: `${array_rqm[(page-1)*5+2]}`, 
							url: `${host.wx}requirement/backstage/${array_rqId[(page-1)*5+2]}`
						},
						{ 
							title: `${array_rqm[(page-1)*5+3]}`, 
							url: `${host.wx}requirement/backstage/${array_rqId[(page-1)*5+3]}`
						},
						{ 
							title: `${array_rqm[(page-1)*5+4]}`, 
							url: `${host.wx}requirement/backstage/${array_rqId[(page-1)*5+4]}`
						},
						{ 
							title: `           第${page}页                           共${ye}页`, 
							url: ``
						}])
					} else {
						res.reply(`总共只有${ye}页`)
					}
				} else {
					res.reply('hehe')
				}
			})


		} else {
			res.reply('输入有误')
		}
	// } else {
	//  res.reply('非管理员暂不提供服务')
	// }
})

module.exports = router
