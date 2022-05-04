const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/USer.Controller')
const multerConfig = require('../app/middleware/multerConfig')

router.get('/signup', UserController.showSignUpPage)
router.post('/signup', UserController.signUp)

router.get('/signin', UserController.showSignInPage)
router.post('/signin', UserController.signIn)

router.get('/seller', UserController.showSellerPage)
router.post('/seller', UserController.addSeller)

router.get('/dashboard', UserController.showDashboard)
router.post('/dashboard', UserController.showProductSeller)
router.delete('/dashboard/:id', UserController.deleteProduct)

router.get('/addproduct', UserController.showAddProductPage)
router.post('/addproduct', multerConfig.single('myfile'), UserController.addProduct)

router.get('/editproduct/:id', UserController.getEditProductPage)
router.post('/editproduct/:id', UserController.postEditProductPage)
router.put('/editproduct/:id', UserController.putEditProductPage)

module.exports = router