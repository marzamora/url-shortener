const URL = require('../api/model')
const dns = require('dns')

const BASE_62_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split('')

const getRandomInt = (min, max) => {
    // Min and Max are inclusve
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

const shortid = (length) => {
    let string = ''
    for (let i = 0; i <= length; i++) {
        string = string.concat(BASE_62_CHARS[getRandomInt(0,6)]);
    }
    return string
}

const shorten = {
    create: (req, res, next) => {
        let data = {}
        let url = req.body.url
        // remove protocol
        url = url.replace(/(^\w+):\/\//, '')
        // remove subdomains
        url = url.replace(/\/.*/, '')
        dns.lookup(url, (err, address, family) => {
            if (err) {
                console.error(err)
                data = {
                    error: 'invalid url'
                }
                return next(null, data)
            }    
            data = {
                original_url: req.body.url
            }
            URL.find(data, (err, doc) => {
                if (err)
                    return next(err)
                if (doc == null) {
                    data.short_url = shortid(5)
                    URL.post(data, (err, data) => {
                        if (err)
                            return next(err)
                        next(null, {
                            original_url: data.original_url,
                            short_url: data.short_url
                        })
                    })
                } else {
                    next(null, {
                        original_url: doc.original_url,
                        short_url: doc.short_url
                    })
                }
            })
        })
    },
    retrieve: (req, res, next) => {
        let data = {
            short_url: req.params.shortened
        }
        URL.find(data, (err, doc) => {
            if (err)
                return next(err)
            next(null, doc)
        })
    }
}

module.exports = shorten;