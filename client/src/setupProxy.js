const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://radiant-chamber-13554.herokuapp.com',
            changeOrigin: true,
        })
    )
}