const shorten = require('../service/shorten')

const controllers = {
    create: (req, res) => {
        shorten.create(req, res, (err, info) => {
            if (err) 
                console.error(err)
            res.json(info)
        })
    },
    redirect: (req, res) => {
        shorten.retrieve(req, res, (err, url) => {
            if (err) {
                console.error(err)
                res.send({error: 'internal_error'})
            } else {
                if (url == null) {
                    res.json({error: 'short url does not exist'})
                } else {
                    res.redirect(url.original_url)
                }
            }
        })
    },
    default: (req, res) => {
        res.json({
            message: "Hello friend"
        })
    }
}

module.exports = controllers