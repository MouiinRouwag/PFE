const homeRoute = require('./home.route');
const authRoute = require('./auth.route');
const adminRoute = require('./admin.route');
// const userRoute = require('./user.route');
// const imageRoute = require('./image.route');
// const announceRoute = require('./announce.route');

module.exports = (app) => {
    app.use('/', homeRoute),
    app.use('/auth', authRoute)
    app.use('/admin', adminRoute)
    app.use('/**', (req, res) => {
        res.writeHead(301, {
            Location: `http://localhost:3000/dashboard`
          }).end();
    })

    // app.use('/user', userRoute)
    // app.use('/image', imageRoute)
    // app.use('/announce', announceRoute)
}