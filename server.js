const express = require('express')
	, app = express()
	, port = process.env.PORT || 2017
	, routes = require('./routes')

const cors = require('cors')
	, bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./mongodb')
require('dotenv').config()

app.use('/wechat', routes.wechat)

app.listen(port, ()=> {
	console.log('Server is ruuning on port: ' + port)
	console.log('Use Ctrl-C to stop')
})
