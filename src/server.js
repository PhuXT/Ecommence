const express = require('express')
const { engine } = require('express-handlebars')
const PORT = 3000 || process.env.PORT
const app = express()
const path = require('path')
const router = require('./router/index.router')
const db = require('./config/db')
const methodOverride = require('method-override')

// set engine
app.engine('.hbs', engine({
    extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'resources/views'))

// set use middleware
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))

// connect db
db.connect()

// set router
router(app)

app.listen((PORT), () => console.log('Server start on port ' +PORT))