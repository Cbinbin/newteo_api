const router = require('express').Router()
	, wechatAPI = require('wechat-api')
	, Requirement = require('../models/Requirement')
	, host = require('../utils/hosturl')


router.get('/news/:id/:n', (req, res)=> {
	var appid = process.env.WX_APPID
		, appsecret = process.env.WX_SECRET
		, wxapi = new wechatAPI(appid, appsecret)
		, openid = req.params.id
		, page = Number(req.params.n)
		, array_rqId = []
		, array_rqm = []
		, ye
	Requirement.find({ }, {__v:0})
	.sort({create_time: -1})
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
		if((array_rqm.length%5) > 0) { ye = parseInt(array_rqm.length/5) + 1 }
		else ye = parseInt(array_rqm.length/5)

		if(page <= 1) {
			page = 1
			var pageC = page + 1
			var articles = [{ 
				title: '需求'
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
				url: `${host.wx}wxsend/news/${openid}/${pageC}`
			}]
			wxapi.sendNews(openid, articles, (err)=> {
				if(err) return res.send(err)
				// res.send('请自行关闭此窗口')
				res.render('wxsends', {body: 'body'})
			})

		} else if(page < ye) {
			//
			var pageN = page - 1
				, pageC = page + 1
			var articles = [{ 
				title: '需求'
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
				title: `                              上一页`, 
				url: `${host.wx}wxsend/news/${openid}/${pageN}`
			},
			{ 
				title: `                              下一页`, 
				url: `${host.wx}wxsend/news/${openid}/${pageC}`
			}]
			wxapi.sendNews(openid, articles, (err)=> {
				if(err) return res.send(err)
				res.render('wxsends', {body: 'body'})
				
			})
		} else if(page = ye) {
			//
			var pageN = page - 1
			var articles = [{ 
				title: '需求'
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
				title: `                              上一页`, 
				url: `${host.wx}wxsend/news/${openid}/${pageN}`
			}]
			wxapi.sendNews(openid, articles, (err)=> {
				if(err) return res.send(err)
				res.render('wxsends', {body: 'body'})
				
			})
		}
	})
})

module.exports = router