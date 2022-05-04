class SiteController {
    // [GET] /
    showIndexPage(req, res, next) {
        res.render('home.hbs')
    }
    
    // [GET] /404
    show404Page(req, res, next) {
        res.render('404.hbs')
    }

    //[GET] /signup
    signUp(req, res, next) {
        res.render('sign-up.hbs', {hasNavbar: false})
    }
}
module.exports = new SiteController
