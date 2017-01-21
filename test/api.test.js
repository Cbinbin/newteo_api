const request = require('superagent')
	, chai = require('chai')
	, host = require('../utils/hosturl')
	, expect = chai.expect

require('dotenv').config()

var token = process.env.NT_TOKEN
	, rqId
	, pnId
	, pdId

describe('需求', function() {
	it('添加', function(done) {
		request
		.post(host.local + 'requirement?token=' + token)
		.send({
			name: 'newteo',
			phone: '13500000000',
			company: 'newteo',
			info: 'newteo'
		})
		.set('Accept', 'application/json')
		.end(function(err, res) {
			if(err) return console.log(err.message)
			expect(res.body._id).to.be.exist
			rqId = res.body._id
			done()
		})	
	})
	it('查看全部', function(done) {
		request
		.get(host.local + 'requirement')
		.end(function(err, res) {
			if(err) return console.log(err.message)
			expect(res.body).to.be.an('array')
			done()
		})	
	})
	it('查看单个', function(done) {
		request
		.get(host.local + 'requirement/' + rqId)
		.end(function(err, res) {
			if(err) return console.log(err.message)
			expect(res.body).to.be.an('object')
			done()
			// console.log(res.body)
		})	
	})
	it('删除', function(done) {
		request
		.delete(host.local + 'requirement/' + rqId + '?token=' + token)
		.end(function(err, res) {
			if(err) return console.log(err.message)
			expect(res.text).to.be.equal('requirement is deleted success')
			done()
		})	
	})
})

describe('合作商', function() {
	it('添加合作商', function(done) {
		request
		.post(host.local + 'partner?token=' + token)
		.send({
			name: 'newteo',
			introduction: 'newteo'
		})
		.set('Accept', 'application/json')
		.end(function(err, res) {
			if(err) return console.log(err.message)
			expect(res.body._id).to.be.exist
			pnId = res.body._id
			done()
		})	
	})
	it('添加 logo', function(done) {
		request
		.post(host.local + 'partner/' + pnId + '/logo?token=' + token)
		.attach('logo','storage/index.jpeg')
		.end(function(err, res) {
			if(err) return console.log(err.message)
			expect(res.body).to.be.an('object')
			done()
		})	
	})
	it('添加项目', function(done) {
		request
		.post(host.local + 'partner/' + pnId + '/product?token=' + token)
		.send({
			title: 'newteo',
			description: 'newteo'
		})
		.set('Accept', 'application/json')
		.end(function(err, res) {
			if(err) return console.log(err.message)
			expect(res.body).to.be.an('object')
			pdId = res.body._id
			done()
		})	
	})
	it('添加项目图片', function(done) {
		request
		.post(host.local + 'partner/product/' + pdId + '/img?token=' + token)
		.attach('img','storage/index.jpeg')
		.end(function(err, res) {
			if(err) return console.log(err.message)
			expect(res.body).to.be.an('object')
			done()
		})	
	})
	it('查看全部', function(done) {
		request
		.get(host.local + 'partner')
		.end(function(err, res) {
			if(err) return console.log(err.message)
			expect(res.body).to.be.an('array')
			done()
		})	
	})
	it('查看单个', function(done) {
		request
		.get(host.local + 'partner/' + pnId)
		.end(function(err, res) {
			if(err) return console.log(err.message)
			expect(res.body).to.be.an('object')
			done()
			// console.log(res.body)
		})	
	})
	it('删除', function(done) {
		request
		.delete(host.local + 'partner/' + pnId + '?token=' + token)
		.end(function(err, res) {
			if(err) return console.log(err.message)
			expect(res.text).to.be.equal('partner delete success')
			done()
		})	
	})
})

describe('项目', function() {
	it('添加', function(done) {
		request
		.post(host.local + 'partner/' + pnId + '/product?token=' + token)
		.send({
			title: 'newteo',
			description: 'newteo'
		})
		.set('Accept', 'application/json')
		.end(function(err, res) {
			if(err) return console.log(err.message)
			expect(res.body).to.be.an('object')
			pdId = res.body._id
			done()
		})	
	})
	it('添加图片', function(done) {
		request
		.post(host.local + 'partner/product/' + pdId + '/img?token=' + token)
		.attach('img','storage/index.jpeg')
		.end(function(err, res) {
			if(err) return console.log(err.message)
			expect(res.body).to.be.an('object')
			done()
		})	
	})
	it('删除', function(done) {
		request
		.delete(host.local + 'partner/product/' + pdId + '?token=' + token)
		.end(function(err, res) {
			if(err) return console.log(err.message)
			expect(res.text).to.be.equal('product delete success')
			done()
		})	
	})
})
