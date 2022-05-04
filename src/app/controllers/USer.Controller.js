const userModel = require('../models/users.models')
const sellerModel = require('../models/sellers.models')
const bcrypt = require('bcrypt')    
const productModel = require('../models/product.model')

class UserController {
                                // [GET] /user/sign-up
    showSignUpPage(req, res, next) {
        res.render('sign-up')
    }

                                 // [POST] /user/sign-up
    async signUp(req, res, next) {
        console.log(req.body);
        const {fullName, email, password, rePassword, phone,
             agreeTerm} =  req.body;
        if(fullName.length < 5){
            res.json({error:'name must be 5 letter long'})
        }else if(!email.length){
            res.json({error:'enter your email address'})
        }else if(password.length < 8) {
            res.json({error:'password must be 8 letter long'})
        }else if(rePassword !== password) {
            res.json({error:'password and confirm password not same'})
        }else if(phone.length < 10 ) {
            res.json({error:'phone invalid'})
        }else if(agreeTerm !== true) {
            res.json({error:'you must agree our term'})
        }
        else {     
            const data = await userModel.findOne({email})
            if(data) {
                res.json({error: 'Email is exist'})
            }
            else {
                // EnCypt Pass
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hash) {
                    req.body.password = hash;
                    const newUser = userModel({fullName, email, password: req.body.password, phone, isSeller: false});
                        newUser.save((err, data) => {
                            if(err){ res.json({error: "Something went wrong"}) }
                            // res.json({fullName, email, isSeller:false});
                            res.json({created: true})
                        })
                    });
                });
            }
        }
    }


                                        // SIGN IN
                                    // [GET] /user/signin
    showSignInPage(req, res, next) {
        res.render('sign-in')
    }

                                // [POST] /user/signIn
    async signIn(req, res, next) {
        let {email, password} = req.body
        if(!email.length || !password.length){
            res.json({error: 'fill all the inputs'})
        }else{
            let user = await userModel.findOne({email:email});  
            if(!user){
                return res.json({error: 'Email not found. Try again'})
            } 
            bcrypt.compare(password, user.password, function(err, result) {
                if(!result){
                return res.json({error: 'Password is incorrect. Try again'})
                }else{
                    return res.json({
                        fullName: user.fullName,
                        email: user.email,
                        isSeller: user.isSeller
                    })
                }
            });
        }
    }


                        // SELLER


                        // [GET] /user/seller
    showSellerPage(req, res, next) {
        res.render('seller')
    }

                         // [POST] /user/seller
    async addSeller(req, res, next) {
        const {bussinessName, numberContact, address, about, email} = req.body
        if(bussinessName.length < 10, numberContact.length < 10, address.length < 10,
            about.length < 10, email.length < 10){
            return res.json({error: 'Some infomation is incorrect'})
        }else {
            try {
                await userModel.updateOne({email}, {isSeller: true})
                console.log('update seller OK');
            } catch (error) {
                console.log(error);
            }
            const newSeller = sellerModel({ 
                bussinessName,
                numberContact,
                address,
                about,
                email
            })
            let emailSeller =  await sellerModel.findOne()
            if(emailSeller){
                return res.json({ isSeller: true})
            }else {
                newSeller.save( (err, data) => {
                    return res.json({ isSeller: true})
                    if(err) {console.log('Khong the luu seller colection')};
                })
            }
        }

    }

                                     // DASHBOARD
                                // [GET] /USER/DASHBOARD
    showDashboard(req, res, next){
        res.render('dashboard')

    }

                                     // [POST] /USER/DASHBOARD
    async showProductSeller(req, res, next) {
        try {
            const data = await productModel.find({seller: req.body.seller})
            if(data[0]) {
                return res.json({listProduct: data})
            }else {
                return res.json({noData: 'data not available'})
            }
        } catch (error) {
            return res.json({error: 'Something went wrong'})
        }
    }
                                //[DELETE] /USER/DASHBOARD
    deleteProduct(req, res, next) {
        const id = req.params.id
        productModel.deleteOne({_id:id}, (err) => {
            if(err) { 
                return res.json({error: 'dont delete Product'})
            }
            return res.json({success: true})
        })

    }                            



                                    // ADD PRODUCT
                                // [GET] /user/addproduct
    showAddProductPage(req, res, next){
        res.render('add-product')
    }

                                // [POST] /user/addproduct
    addProduct(req, res, next){
        const {productName, shortDescription, productPrice, description, tag, seller} = req.body
        Number.parseInt(productPrice)
        if( !productName.length  ||
            !shortDescription.length  ||
            !productPrice.length ||
            !description.length  ||
            !tag.length ) {
                return res.json({error: 'All field is required'});
        } else if (Number.isInteger(productPrice)){
            return res.json({error: 'Price not a number'});
        } else if(!seller){
            return res.render('sign-in')
        }
        else { 
            const imgpath = req.file.path.split('/')
            imgpath.shift()
            imgpath.shift()
            const urlImg = imgpath.join('/')
            const product = productModel({
                seller,
                nameProduct: productName,
                shortDescription,
                description,
                price: productPrice,
                tags: tag,
                img: urlImg
            })
            product.save((err, data) => {
                if(err) {
                    return res.json( {error: 'Some thing went wrong'} );
                }
                return res.json( {success: 'Saved to DB'})
            })
        }    
    }   


    getEditProductPage(req, res) {
       res.render('add-product') 
    }
    postEditProductPage(req, res){
        const {id, user} = req.body
        productModel.findOne({_id:id, seller: user.email}, (err, product) => {
            if(err){
                return res.json( {error: 'Dont fint product'})
            }
            return res.json( {product})
        })
    }
    putEditProductPage(req, res){

    }
}

module.exports = new UserController
