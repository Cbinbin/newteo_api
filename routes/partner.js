const router = require('express').Router()
	, multer = require('multer')
	, fs = require('fs')
	, Img = require('../models/Img')
	, Partner = require('../models/Partner')
	, Product = require('../models/Product')
	, host = require('../utils/hosturl')

const img_storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'storage/imgs')
	},
	filename: (req, file, cb)=> {
		cb(null, Date.now() + file.originalname )
	}
})
const img_upload = multer({storage: img_storage}).single('img')

const logo_storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'storage/logos')
	},
	filename: (req, file, cb)=> {
		cb(null, Date.now() + file.originalname )
	}
})
const logo_upload = multer({storage: logo_storage}).single('logo')

router.post('/', (req, res)=> {
	if(req.query.token != process.env.NT_TOKEN) return res.send('Invalid token')
	const pn = new Partner({
		logo: null,
		name: req.body.name ||'空',
		introduction: req.body.introduction ||'空',
		products: req.body.products ||[ ],
	})
	pn.save((err)=> {
		if(err) return res.send(err)
		res.send(pn)
	})
})

router.post('/:id/logo', (req, res)=> {
	if(req.query.token != process.env.NT_TOKEN) return res.send('Invalid token')
	const paneId = req.params.id
	logo_upload(req, res, (err)=> {
		if(err) return res.send('something wrong')
		Partner.findOneAndUpdate({_id: paneId}, 
			{$set: {logo: host.newteo + req.file.path}}, 
			{new: true}, 
			(err, partner)=> {
				if(err) return res.send(err)
				res.send(partner)
		})
	})
})

router.post('/:id/product', (req, res)=> {
	if(req.query.token != process.env.NT_TOKEN) return res.send('Invalid token')
	const paneId = req.params.id
	const pd = new Product({
		owner: paneId,
		title: req.body.title ||'空',
		img: req.body.img ||[ ],
		description: req.body.description ||'空',
	})
	pd.save((err)=> {
		if(err) return res.send(err)
		Partner.update({_id: paneId}, 
			{$push: {products: pd._id}}, 
			(err, txt)=> {
				if(err) return res.send(err)
				console.log(txt)
			})
		res.send(pd)
	})
})

router.post('/product/:id/img', (req, res)=> {
	if(req.query.token != process.env.NT_TOKEN) return res.send('Invalid token')
	const prodId = req.params.id
	img_upload(req, res, (err)=> {
		if(err) return res.send('something wrong')
		const pic = new Img({
			img_url: host.newteo + req.file.path
		})
		pic.save((err)=> {
			if(err) return res.send(err)
			Product.findOneAndUpdate({_id: prodId}, 
				{$push: {img: pic._id}}, 
				{new: true}, 
				(err, product)=> {
					if(err) return res.send(err)
					res.send(product)
			})
		})
	})
})

router.get('/', (req, res)=> {
	Partner.find({ }, {__v: 0})
	.populate({ path: 'products', 
		select: 'title img description create_time',
		populate: {
			path: 'img',
			select: 'img_url'
		}
	})
	.exec((err, partners)=> {
		if(err) return res.send(err)
		res.send(partners)
	})
})

router.get('/:id', (req, res)=> {
	const paneId = req.params.id
	Partner.findOne({_id: paneId}, {__v: 0})
	.populate({ path: 'products', 
		select: 'title img description create_time',
		populate: {
			path: 'img',
			select: 'img_url'
		}
	})
	.exec((err, partner)=> {
		if(err) return res.send(err)
		res.send(partner)
	})
})

router.patch('/:pnid/product/:pdid/to', (req, res)=> {
	if(req.query.token != process.env.NT_TOKEN) return res.send('Invalid token')
	const paneId = req.params.pnid
		, prodId = req.params.pdid
	Partner.findOneAndUpdate({_id: paneId}, 
		{$push: {products: prodId}}, 
		{new: true}, 
		(err, partner)=> {
			if(err) return res.send(err)
			res.send(partner)
		})
})

function delDoc(model, id) {
	model.remove({_id: id})
	.exec((err)=> {
		if(err) return console.log(err)
		console.log(id + ' delete success')
	})
}

function delImgFile(id) {
	Img.findOne({_id: id}, (err, img)=> {
		if(err) return console.log(err)
		else if(!img) return console.log('Not found ' + id)
		fs.unlink(img.img_url.substring(23), (err)=> {
			if(err) return console.log(err)
			console.log(img.img_url.substring(23) + ' delete success')
			delDoc(Img, id)
		})
	})
}

router.delete('/product/:id', (req, res)=> {
	if(req.query.token != process.env.NT_TOKEN) return res.send('Invalid token')
	const prodId = req.params.id
	Product.findOne({_id: prodId})
	.exec((err, product)=> {
		if(err) return res.send(err)
		else if(!product) return res.send({warning: 'Product Id error'})
		product.img.map((item)=> {
			delImgFile(item)
		})
		delDoc(Product, product._id)
		res.send('product delete success')
	})
})


router.delete('/:id', (req, res)=> {
	if(req.query.token != process.env.NT_TOKEN) return res.send('Invalid token')
	const paneId = req.params.id
	Partner.findOne({_id: paneId})
	.exec((err, partner)=> {
		if(err) return res.send(err)
		else if(!partner) return res.send({warning: 'Partner Id error'})
		if(partner.products == [ ]) return 
		partner.products.map((item)=> {
			Product.findOne({_id: item})
			.exec((err, product)=> {
				if(err) return console.log(err)
				else if(!product) return
				if(product.img == [ ]) return 
				product.img.map((items)=> {
					delImgFile(items)
				})
				delDoc(Product, product._id)
			})
		})
		if(partner.logo) {
			fs.unlink(partner.logo.substring(23), (err)=> {
				if(err) return console.log(err)
				console.log(partner.logo.substring(23) + ' delete success')
				delDoc(Partner, partner._id)
			})
		} else { delDoc(Partner, partner._id) }
		res.send('partner delete success')
	})
})

module.exports = router
