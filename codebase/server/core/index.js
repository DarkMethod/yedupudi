exports.init = function init(){
    var router  = require('./router')
        , middleware  = require('./middleware')
		, express = require('express')
		, jwt = require('express-jwt')
        , app     = express()
        , conf    = require('./conf').get(process.env.NODE_ENV)
		, auth = jwt({secret: conf.application.jwtSecret, userProperty: 'payload'});;
        

    middleware.setup(app, conf);
    router.run( app, auth, conf.application.routes);

    app.listen(conf.server.port);
    console.log('Yedupudi-server pid %s listening on %d in %s',process.pid,conf.server.port,process.env.NODE_ENV);
};