const router = require('express').Router()
	, request = require('superagent')
	, Requirement = require('../models/Requirement')
	, host = require('../utils/hosturl')
	, moment = require('moment')
//
router.post('/', (req, res)=> {
	var nowdate = new Date()
	, year = nowdate.getFullYear()
	, month = nowdate.getMonth() + 1
	, day = nowdate.getDate()
	, week = {
		'0': '\u65e5',
		'1': '\u4e00',
		'2': '\u4e8c',
		'3': '\u4e09',
		'4': '\u56db',
		'5': '\u4e94',
		'6': '\u516d'
	}
	, hour = nowdate.getHours() + 8
	, minute = nowdate.getMinutes()
	, second = nowdate.getSeconds()
	, datestr = year + '年' + month + '月' + day + '日  星期' + week[nowdate.getDay()] + '  ' + hour + ':' + minute + ':' + second

	if(req.query.token != process.env.NT_TOKEN) return res.send('Invalid token')
	const re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/
	if(req.body.phone.length != 11) { return res.send({error: '不是11位'})}
	if(!re.test(req.body.phone)) { 
		return res.send({error: '号码无效'})
	}
	const requ = new Requirement({
		name: req.body.name || '空',
		phone: req.body.phone,
		company: req.body.company || '空',
		info: req.body.info || '空',
		create_time: datestr
	})
	requ.save((err)=> {
		if(err) return res.send(err)
		res.send(requ)
	})
})
//
router.get('/', (req, res)=> {
	Requirement.find()
	.exec((err, requments)=> {
		if(err) return res.send(err)
		res.send(requments)
	})
})
//
router.get('/:id', (req, res)=> {
	const rqId = req.params.id
	Requirement.findOne({_id: rqId})
	.exec((err, requment)=> {
		if(err) return res.send(err)
		else if(!requment) return res.send({error: 'id error'})
		res.send(requment)
	})
})
//
router.delete('/:id', (req, res)=> {
	if(req.query.token != process.env.NT_TOKEN) return res.send('Invalid token')
	const rqId = req.params.id
	Requirement.remove({_id: rqId}, (err)=> {
		if(err) return res.send(err)
		res.send('requirement is deleted success')
	})
})

router.get('/backstage/:id', (req, res)=> {
	rqId = req.params.id
	token = process.env.NT_TOKEN
	request.delete(`${host.wx}requirement/${rqId}?token=${token}`)
	.end((err, result)=> {
		if(err) return res.send(err)
		res.send(result.text)
	})
})

module.exports = router
