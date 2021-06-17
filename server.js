require('dotenv').config()
const express = require('express')
const app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
const cors = require('cors')
app.use(cors({optionsSuccessStatus: 200}))

// http://expressjs.com/en/starter/static-files.html
app.use('/public', express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

// enable body parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

// assign routes to handle requests
const routes = require('./api/routes')
routes(app)

// listen for requests
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Server is currently listening on port: '
        + listener.address().port)
}) 