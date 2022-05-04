const siteRouter = require('./site.router')
const userRouter  = require('./user.router')
const productRouter = require('./product.router')

function router(app) {
    app.use('/product', productRouter)
    app.use('/user', userRouter)
    app.use('/', siteRouter)
}
module.exports = router
