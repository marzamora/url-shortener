// require('dotenv').config

const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
/* Create a Schema */
const { Schema } = mongoose;
const URLSchema = new Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true
    }
});
/* Create a Model */
const URL = mongoose.model('URL', URLSchema)

const URLfunctions = {
    post: (data, done) => {
        let temp = new URL(data)
        temp.save((err, data) => {
            if (err)
                return done(err)
            done(null, data)
        });
    },
    find: (data, done) => {
        URL.findOne(data).exec( (err, data) => {
            if (err)
                return done(err)
            done(null, data)
        })
    }
}

module.exports = URLfunctions