const router = require('express').Router()
	, multer = require('multer')
	, Img = require('../models/Img')
	, Logo = require('../models/Logo')
	, Partner = require('../models/Partner')
	, Product = require('../models/Product')

const img_storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'storage/imgs')
	},
	filename: (req, file, cb)=> {
		cb(null, file.fieldname + '-' + Date.now())
	}
})
const img_upload = multer({storage: img_storage}).single('img')

const logo_storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'storage/logos')
	},
	filename: (req, file, cb)=> {
		cb(null, file.fieldname + '-' + Date.now())
	}
})
const logo_upload = multer({storage: logo_storage}).single('logo')

router.post('/', (req, res)=> {
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

})

router.post('/:id/product', (req, res)=> {
	const paneId = req.params.id
	const pd = new Product({
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


module.exports = router
