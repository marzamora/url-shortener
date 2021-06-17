const controller = require('./controller')

module.exports = (app) => {
    app.route('/api')
        .get(controller.default)
    app.route('/api/shorturl')
        .post(controller.create)
    app.route('/api/shorturl/:shortened')
        .get(controller.redirect)
}