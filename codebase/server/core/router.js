var helper = require('../routes/helper');

exports.run = function route( app, auth, routes){
    var handlers = {};
 
	/*	 REST routes	*/	
    
	routes.forEach(function(val){
        handlers[val] = require('../routes/'+val);

        app.get('/'+val, handlers[val].get);
        app.get('/'+val+'/:id',  auth,  handlers[val].find);
        app.post('/'+val,  handlers[val].ins);
        app.put('/'+val+'/:id',  auth,  handlers[val].upd);
        app.delete('/'+val+'/:id',  auth,  handlers[val].del);
    });
	 
	/*   Authentication routes	*/ 
	
	app.post('/auth/signup',  helper.signupHandler);
	app.post('/auth/forgot',  helper.forgotPasswordHandler);
	app.post('/auth/login',  helper.loginHandler);
	app.post('/auth/google',helper.googleHandler);
	app.post('/auth/facebook',helper.facebookHandler);
	app.get('/auth/verify/:token',helper.verifyEmailHandler);
	app.get('/auth/reset/:type/:token',helper.resetPasswordHandler);
	app.post('/auth/reset/:token',helper.updatePasswordHandler);
};
