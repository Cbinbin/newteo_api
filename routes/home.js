const router = require('express').Router()
	, host = require('../utils/hosturl')

router.get('/', (req, res)=> {
	res.json({
		home: host.newteo,
		xuqiu: host.newteo + 'xuqiu',
		wechat: host.newteo + 'wechat',
		partner: host.newteo + 'partner',
		requirement: host.newteo + 'requirement'
	})
})

module.exports = router