const express = require('express')
const router = express.Router()
const SiteController = require('../app/controllers/SiteController')

router.get('/404', SiteController.show404Page)
router.get('/', SiteController.showIndexPage)


module.exports = router
