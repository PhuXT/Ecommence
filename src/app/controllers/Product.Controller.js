const productModel = require('../models/product.model')
const reviewModel = require('../models/reviews.model')

class ProductController{
    showProductPage(req, res, next) {
    }

    getDetailProduct(req, res) {
        res.render('detail-product')
    }
    async postDetailProduct(req, res) {
        let reviews = await reviewModel.find({productID: req.params.id})
        const listReviews = []
           if(reviews.length > 4 ){
                for(let i = 0; i < 4; i++){
                    let index = Math.floor(Math.random() * reviews.length)
                    listReviews.push(reviews[index])
                }
                reviews = listReviews
           }
        productModel.findOne({_id: req.params.id}, function(err, product){
            if(err){
                return res.json({error: 'product not found'})
            }
            const tags = product.tags.split(',')
            let sameProduct = []
            productModel.find({}, (err, products) => {
                products.forEach(product => {
                    for(let x = 0; x <= tags.length; x++) {
                        if(product.tags.includes(tags[x])) {
                            if(product._id != req.params.id){
                                sameProduct.push(product);
                                break;
                            }
                        }
                    }
                })
                return res.json({product, sameProduct, reviews});
            })
        })
    }

    async addReview(req, res){
        const review = reviewModel(req.body);
        // add new Review
        try {
           await review.save()
           const reviews = await reviewModel.find({productID: req.body.productID})
        // update rating in product
            let everangeStar = reviews.reduce((luuTru, curr) => {
                return luuTru + parseInt(curr.rating)
            }, 0)
            everangeStar = Math.floor(everangeStar/reviews.length)
            await productModel.updateOne({_id: req.body.productID}, {
                everageRating: everangeStar,
                countRating: reviews.length
            })

        //    respone reviews
           const listReviews = []
           if(reviews.length > 4 ){
                listReviews.unshift(review)
                for(let i = 0; i < 3; i  ++){
                    let index = Math.floor(Math.random() * reviews.length)
                    listReviews.push(reviews[index])
                }
                return res.json({reviews:listReviews})
           }else {
               return res.json({reviews})
           }
        } catch (error) {
            console.log(error);
            
        }
        
    }

}

module.exports = new ProductController