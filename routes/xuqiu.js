const router = require('express').Router()
	, Requirement = require('../models/Requirement')

router.get('/', (req, res) => {
	const rqms = []
	Requirement.find()
	.exec((err, requms)=> {
		if(err) return res.send(err)
		requms.map((item)=> {
			rqms.push(item)
		})
		console.log(rqms)
		res.render('xuqius', {
			data: rqms
		})
	})
})

module.exports = router
