const express = require('express')
	, app = express()
	, port = process.env.PORT || 2017
	, routes = require('./routes')

const cors = require('cors')
	, bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/storage', express.static('storage'))

require('./mongodb')
require('dotenv').config()

//////weixin
const wechat = require('wechat')
	, config = {
	token: process.env.WX_TOKEN,
	appid: process.env.WX_APPID,
	encodingAESKey: process.env.WX_EC_AESKEY
}
app.use(express.query())
app.use('/wechat', wechat(config, routes.wechat))
//////

app.use('/code', routes.code)
app.use('/accesstoken', routes.accesstoken)
app.use('/requirement', routes.requirement)
app.use('/partner', routes.partner)

app.listen(port, ()=> {
	console.log('Server is ruuning on port: ' + port)
	console.log('Use Ctrl-C to stop')
})
