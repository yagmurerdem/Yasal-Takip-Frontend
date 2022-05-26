const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  

  app.use(
    '/register', 
    createProxyMiddleware({
      target: 'http://localhost:9999',
      changeOrigin: true,
    })
  );

  app.use(
    '/avukat',
    createProxyMiddleware({
      target: 'http://localhost:8190',
      changeOrigin: true,
    })
  );

  app.use(
    '/borcdetay',
    createProxyMiddleware({
      target: 'http://localhost:8191',
      changeOrigin: true,
    })
  );
  
  app.use(
    '/login', 
    createProxyMiddleware({
      target: 'http://localhost:9999',
      changeOrigin: true,
    })
  );
  app.use(
    '/ekle',
    createProxyMiddleware({
      target: 'http://localhost:8190',
      changeOrigin: true,
    })
  );
  app.use(
    '/delete/**',
    createProxyMiddleware({
      target: 'http://localhost:8190',
      changeOrigin: true,
    })
  );

};

















