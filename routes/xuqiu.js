const router = require('express').Router()
	, Requirement = require('../models/Requirement')

router.get('/', (req, res) => {
	const rqms = [ ]
	Requirement.find()
	.exec((err, requms)=> {
		if(err) return res.send(err)
		requms.map((item)=> {
			rqms.push(item)
		})
		res.render('xuqius', {
			data: rqms,
			tt: process.env.NT_TOKEN
		})
	})
})

module.exports = router
