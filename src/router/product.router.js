const express = require('express')
const router = express.Router()

const productController = require('../app/controllers/Product.Controller')

router.get('/:id', productController.getDetailProduct)

router.post('/addreview', productController.addReview)
router.post('/:id', productController.postDetailProduct)

router.get('/', productController.showProductPage)


module.exports = router