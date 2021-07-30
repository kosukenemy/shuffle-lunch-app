
const { createProxyMiddleware } = require('http-proxy-middleware');
    
module.exports = function(app) {

    app.use(    
        `/hotpepper/gourmet/v1/?key=${process.env.REACT_APP_HOTPEPPAR_APIKEY}&middle_area=Y045&count=100&format=json`, //this is your api
        createProxyMiddleware({
            target:`https://webservice.recruit.co.jp`, //this is your whole endpoint link
            changeOrigin: true,
            secure: false,
        })
    );
    
};

