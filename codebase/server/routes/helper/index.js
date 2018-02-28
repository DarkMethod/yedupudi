var uuid = require('node-uuid');
var crypto = require('crypto');
var base64url = require('base64url');
var request = require('request');
var nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
var conf    = require('../../core/conf').get(process.env.NODE_ENV);

var logAndRespond = function logAndRespond(err, res, status){
    console.error(err);
	return res.status(500).send({message :	err.message});
};

var generateJWT = function(user){
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 60);
	return jwt.sign({
	uuid	: user.uuid,
	name	: user.name,
	email	: user.email,
	phone	: user.phone,
	type	: user.type,
	exp: parseInt(exp.getTime() /1000),
	}, conf.application.jwtSecret);
 };
 
var setPassword = function(password){
	var cipher = {};
	
	cipher.salt = crypto.randomBytes(16).toString('hex');
	cipher.hash = crypto.pbkdf2Sync(password, cipher.salt, 1000, 64).toString('hex');
	
	return cipher;
};

var randomStringAsBase64Url = function (size) {
  return base64url(crypto.randomBytes(size));
};

var sendMail = function(mail, callback){
	var smtpTransport = nodemailer.createTransport(conf.mailer.smtp);
	
	var mailOptions={
        to : mail.to,
        subject : mail.subject,
        html : mail.html 
    }
	
	smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
           callback(error);
     }else{
            error = false;
            status = true;
			callback(error, status);
         }
	});
};

/***	Handler Functions	***/

exports.signupHandler = function(req, res){
	req.mysql.getConnection(function(err, connection){
		if (err){ logAndRespond(err, res); return; }
		connection.query('SELECT * FROM user WHERE email= ?', req.body.email, function (err, rows) {
			if (err){ logAndRespond(err, res); return; }
			if(rows.length){
				connection.release();
				return res.status(409).send({ message: 'Email is already taken' });
			}
			else{
				connection.query('SELECT * FROM alias WHERE providerEmail= ?', req.body.email, function (err, rows) {
					if (err){ logAndRespond(err, res); return; }
					if(rows.length){
						connection.release();
						return res.status(409).send({ message: 'Email is already taken' });
					}

					var user = {};
					var cipher = setPassword(req.body.password);
					user.name = req.body.name;
					user.email = req.body.email;
					user.uuid = uuid.v4();
					user.salt = cipher.salt;
					user.hash = cipher.hash;
					user.verifyEmailToken = crypto.randomBytes(16).toString('hex');;
					user.verifyEmailExpires = Date.now() + 3600000; // 1 hr
					
					connection.query('INSERT INTO user SET ?', user, function (err) {
						if (err){ logAndRespond(err, res); return; }
				
						var message = {};
						message.to = user.email;
						message.subject = 'Activate your Yedupudi account';
						message.html = "Hello there,<br> Thanks for registering with Yedupudi.<br>Click on the following link to activate your account.<br><a href="+conf.mailer.verifyEmailLink+user.verifyEmailToken+">Activate my account</a><br>Cheers,<br>TEAM Yedupudi";
				
						sendMail(message, function(err, sent){
							if(err){ 
								logAndRespond(err, res); 
								connection.query('DELETE FROM user WHERE uuid= ?', user.uuid, function (err) {
									if (err){ logAndRespond(err, res); return; }
									connection.release();
									return res.status(500).send();	
								});
							}	
							if(sent){
								connection.release();
								return res.status(200).send();	
							}
						});	
					});
				});
			}
		});
	});
};

exports.forgotPasswordHandler = function(req, res){
	if(req.body.type === 'admin'){
		req.mysql.getConnection(function(err, connection){
			if (err){ logAndRespond(err, res); return; }
			connection.query('SELECT uuid FROM admin WHERE email= ?', req.body.email, function(err, rows) {
				if (err){ logAndRespond(err, res); return; }
				if(!rows.length){
					connection.release();
					return res.status(404).send();
				}
			
				var user = {};
				user.resetPasswordToken = crypto.randomBytes(16).toString('hex');
				user.resetPasswordExpires = Date.now() + 3600000; // 1 hr
			
				connection.query('UPDATE admin SET ? WHERE uuid='+connection.escape(rows[0].uuid), user, function(err) {
					if (err){ logAndRespond(err, res); return; }
				
					var message = {};
					message.to = req.body.email;
					message.subject = 'Reset your Yedupudi password';
					message.html = "Hello there,<br> We had received a password reset request for your Yedupudi account.<br>Click on the following link to reset your password.<br><a href="+conf.mailer.adminResetPasswordLink+user.resetPasswordToken+">Reset password</a><br>Cheers,<br>Team Yedupudi";
				
					sendMail(message, function(err, sent){
						if(err){ logAndRespond(err, res); return; }
						if(sent){
							connection.release();
							return res.status(200).send();	
						}
					});	
				});
			});
		});
	}else{
		req.mysql.getConnection(function(err, connection){
			if (err){ logAndRespond(err, res); return; }
			connection.query('SELECT uuid FROM user WHERE email= ?', req.body.email, function(err, rows) {
				if (err){ logAndRespond(err, res); return; }
				if(!rows.length){
					connection.release();
					return res.status(404).send();
				}
			
				var user = {};
				user.resetPasswordToken = crypto.randomBytes(16).toString('hex');
				user.resetPasswordExpires = Date.now() + 3600000; // 1 hr
			
				connection.query('UPDATE user SET ? WHERE uuid='+connection.escape(rows[0].uuid), user, function(err) {
					if (err){ logAndRespond(err, res); return; }
				
					var message = {};
					message.to = req.body.email;
					message.subject = 'Reset your Yedupudi password';
					message.html = "Hello there,<br> We had received a password reset request for your Yedupudi account.<br>Click on the following link to reset your password.<br><a href="+conf.mailer.resetPasswordLink+user.resetPasswordToken+">Reset password</a><br>Cheers,<br>Team Yedupudi";
				
					sendMail(message, function(err, sent){
						if(err){ logAndRespond(err, res); return; }
						if(sent){
							connection.release();
							return res.status(200).send();	
						}
					});	
				});
			});
		});
	}
};

exports.loginHandler = function(req, res){
	if(req.body.type === 'admin'){	
		req.mysql.getConnection(function(err, connection){
			if (err){ logAndRespond(err, res); return; }
			connection.query('SELECT * FROM admin WHERE email= ?', req.body.email, function (err, rows) {
				if (err){ logAndRespond(err, res); return; }
				if(!rows.length){
					connection.release();
					return res.status(401).send();
				}
				var user = {};
				var salt = rows[0].salt;
				var hash = rows[0].hash;
				user.uuid = rows[0].uuid;
				user.name = rows[0].name;
				user.email = rows[0].email;
				user.phone = rows[0].phone;
				user.type = rows[0].type;
			
				if (!( hash === crypto.pbkdf2Sync(req.body.password, salt, 1000, 64).toString('hex'))){
					connection.release();
					return res.status(401).send();
				}
				connection.release();
				return res.status(200).send({ token: generateJWT(user) });
			});
		});	
	}else{
		req.mysql.getConnection(function(err, connection){
			if (err){ logAndRespond(err, res); return; }
			connection.query('SELECT * FROM user WHERE email= ?', req.body.email, function (err, rows) {
				if (err){ logAndRespond(err, res); return; }
				if(!rows.length){
					connection.release();
					return res.status(401).send();
				}
				if(!rows[0].active){
					connection.release();
					return res.status(403).send();
				}
				
				var user = {};
				var salt = rows[0].salt;
				var hash = rows[0].hash;
				user.uuid = rows[0].uuid;
				user.name = rows[0].name;
				user.email = rows[0].email;
				user.phone = rows[0].phone;
				user.type = rows[0].type;
			
				if (!( hash === crypto.pbkdf2Sync(req.body.password, salt, 1000, 64).toString('hex'))){
					connection.release();
					return res.status(401).send();
				}
				connection.release();
				return res.status(200).send({ token: generateJWT(user) });
			});
		});
	
	}
};

exports.googleHandler = function(req, res){
	var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
	var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
	var params = {
		code: req.body.code,
		client_id: req.body.clientId,
		client_secret: conf.googleAuth.clientSecret,
		redirect_uri: req.body.redirectUri,
		grant_type: 'authorization_code'
	};

	// Step 1. Exchange authorization code for access token.
	request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
		var accessToken = token.access_token;
		var headers = { Authorization: 'Bearer ' + accessToken };

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
		if (profile.error) {
			return res.status(500).send({message: profile.error.message});
		}
		 // Step 3a. Link user accounts.
		if (req.header('Authorization')) {
			req.mysql.getConnection(function(err, connection){
				if (err){ logAndRespond(err, res); return; }
				console.log(profile.sub);
				connection.query('SELECT * FROM alias WHERE provider= ? AND providerId= ?',['google', profile.sub], function(err, rows) {
					if (rows.length) {
						return res.status(409).send({ message: 'This google account is already linked.' });
					}
					var token = req.header('Authorization').split(' ')[1];
					var payload = jwt.decode(token, conf.application.jwtSecret);
					connection.query('SELECT * FROM user WHERE uuid= ?', payload.uuid, function(err, rows) {
						if (!rows.length) {
							return res.status(400).send({ message: 'User not found' });
						}
						var alias = {};
						var user = {};
						alias.uuid = rows[0].uuid;
						alias.provider = 'google';
						alias.providerId = profile.sub;
						alias.providerEmail = profile.email;
						user.uuid = rows[0].uuid;
						user.name = rows[0].name;
						user.email = rows[0].email;
						user.phone = rows[0].phone;
						user.type = rows[0].type;	
						
						connection.query('INSERT INTO alias SET ?', alias, function (err) {
							if (err){ logAndRespond(err, res); return; }
							connection.release();
							res.send({ token: generateJWT(user)});
						});
					});
				});
			});	
		}else{ 
        // Step 3b. Create a new user account or return an existing one.
			req.mysql.getConnection(function(err, connection){
				if (err){ logAndRespond(err, res); return; }
				connection.query('SELECT * FROM alias WHERE provider= ? AND providerId= ?', ['google', profile.sub], function(err, rows) {
					if (err){ logAndRespond(err, res); return; }
					if (!rows.length) {
						var user = {};
						var alias = {};
						user.uuid = alias.uuid = uuid.v4();
						user.name = profile.name;
						user.email = profile.email;
						user.phone = '';
						user.type = 'client';
						alias.provider = 'google';
						alias.providerId = profile.sub;
						alias.providerEmail = profile.email;
						
						connection.query('INSERT INTO alias SET ?', alias, function(err) {
							if (err){ logAndRespond(err, res); return; }
							connection.query('INSERT INTO user SET ?', user, function(err) {
								if (err){ logAndRespond(err, res); return; }
								connection.release();
								return res.status(200).send({ token: generateJWT(user) });	
							});
						});
					}
					else {
						var user = {};
						user.uuid = rows[0].uuid;
						user.name = rows[0].name;
						user.email = rows[0].email;
						user.phone = rows[0].phone;
						user.type = rows[0].type;
						connection.release();
						return res.status(200).send({ token: generateJWT(user) });
					}	
				});	
			});
		}	
    });
  });
};
exports.facebookHandler = function(req, res) {
	var fields = ['id', 'email', 'name'];
	var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
	var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
	var params = {
		code: req.body.code,
		client_id: req.body.clientId,
		client_secret: conf.facebookAuth.clientSecret,
		redirect_uri: req.body.redirectUri
	};

	// Step 1. Exchange authorization code for access token.
	request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
		if (response.statusCode !== 200) {
		return res.status(500).send({ message: accessToken.error.message });
    }

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
		if (response.statusCode !== 200) {
			return res.status(500).send({ message: profile.error.message });
		}
		// Step 3a. Link user accounts.
		if (req.header('Authorization')) {
			req.mysql.getConnection(function(err, connection){
				if (err){ logAndRespond(err, res); return; }
				connection.query('SELECT * FROM alias WHERE provider= ? AND providerId= ?',['facebook', profile.id], function(err, rows) {
					if (rows.length) {
						return res.status(409).send({ message: 'This facebook account is already linked.' });
					}
					var token = req.header('Authorization').split(' ')[1];
					var payload = jwt.decode(token, conf.application.jwtSecret);
					connection.query('SELECT * FROM user WHERE uuid= ?', payload.uuid, function(err, rows) {
						if (!rows.length) {
							return res.status(400).send({ message: 'User not found' });
						}
						var alias = {};
						var user = {};
						alias.uuid = rows[0].uuid;
						alias.provider = 'facebook';
						alias.providerId = profile.id;
						alias.providerEmail = profile.email;
						user.uuid = rows[0].uuid;
						user.name = rows[0].name;
						user.email = rows[0].email;
						user.phone = rows[0].phone;
						user.type = rows[0].type;
						
						connection.query('INSERT INTO alias SET ?', alias, function (err) {
							if (err){ logAndRespond(err, res); return; }
							connection.release();
							res.send({ token: generateJWT(user)});
						});
					});
				});
			});	
		}else{
			req.mysql.getConnection(function(err, connection){
				if (err){ logAndRespond(err, res); return; }
				connection.query('SELECT * FROM alias WHERE provider= ? AND providerId= ?', ['facebook', profile.id], function(err, rows) {
					if (err){ logAndRespond(err, res); return; }
					if (!rows.length) {
						var user = {};
						var alias = {};
						user.uuid = alias.uuid = uuid.v4();
						user.name = profile.name;
						user.email = profile.email;
						user.phone = '';
						user.type = 'client';
						alias.provider = 'facebook';
						alias.providerId = profile.id;
						alias.providerEmail = profile.email;
						
						connection.query('INSERT INTO alias SET ?', alias, function(err) {
							if (err){ logAndRespond(err, res); return; }
							connection.query('INSERT INTO user SET ?', user, function(err) {
								if (err){ logAndRespond(err, res); return; }
								connection.release();
								return res.status(200).send({ token: generateJWT(user) });	
							});
						});
					}
					else {
						var user = {};
						user.uuid = rows[0].uuid;
						user.name = rows[0].name;
						user.email = rows[0].email;
						user.phone = rows[0].phone;
						user.type = rows[0].type;
						connection.release();
						return res.status(200).send({ token: generateJWT(rows[0]) });
					}	
				});	
			});
		}	
    });
  });
};

exports.verifyEmailHandler = function(req, res){
	req.mysql.getConnection(function(err, connection){
		if (err){ logAndRespond(err, res); return; }
		connection.query('SELECT uuid FROM user WHERE verifyEmailToken= ? AND verifyEmailExpires> ?', [req.params.token, Date.now()], function (err, rows) {
			if (err){ logAndRespond(err, res); return; }
			if(rows.length){
				var user = { active : 1 };
				connection.query('UPDATE user SET ? WHERE uuid='+connection.escape(rows[0].uuid), user, function (err) {
					if (err){ logAndRespond(err, res); return; }
					connection.release();
					return res.redirect('/#/login/login/verified');
				});	
			}
			else{
				connection.query('DELETE FROM user WHERE verifyEmailToken= ? AND verifyEmailExpires< ? AND active= ?', [req.params.token, Date.now(), 0], function (err) {
					if (err){ logAndRespond(err, res); return; }
					connection.release();
					return res.redirect('/#/login/registration/expired');
				});	
			}	
		});
	});
};

exports.resetPasswordHandler = function(req, res){
	if(req.params.type === 'admin'){
		req.mysql.getConnection(function(err, connection){
			if (err){ logAndRespond(err, res); return; }
			connection.query('SELECT uuid FROM admin WHERE resetPasswordToken= ? AND resetPasswordExpires> ?', [req.params.token, Date.now()], function (err, rows) {
				if (err){ logAndRespond(err, res); return; }
				if(rows.length){
					connection.release();
					return res.redirect('/#/login/admin/reset/'+req.params.token);	
				}else{
					connection.release();
					return res.redirect('/#/login/admin/forgot/invalid');
				}		
			});
		});
	}else{
		req.mysql.getConnection(function(err, connection){
			if (err){ logAndRespond(err, res); return; }
			connection.query('SELECT uuid FROM user WHERE resetPasswordToken= ? AND resetPasswordExpires> ?', [req.params.token, Date.now()], function (err, rows) {
				if (err){ logAndRespond(err, res); return; }
				if(rows.length){
					connection.release();
					return res.redirect('/#/login/reset/'+req.params.token);	
				}else{
					connection.release();
					return res.redirect('/#/login/forgot/invalid');
				}		
			});
		});
	}
};

exports.updatePasswordHandler = function(req, res){
	if(req.body.type === 'admin'){
		req.mysql.getConnection(function(err, connection){
			if (err){ logAndRespond(err, res); return; }
			connection.query('SELECT * FROM admin WHERE resetPasswordToken= ? AND resetPasswordExpires> ?', [req.params.token, Date.now()], function (err, rows) {
				if (err){ logAndRespond(err, res); return;}
				if(rows.length){
					var user = {};
					var cipher = setPassword(req.body.password);
					user.salt = cipher.salt;
					user.hash = cipher.hash;
					user.resetPasswordToken = '';
					user.resetPasswordExpires = '';
				
					connection.query('UPDATE admin SET ? WHERE uuid='+connection.escape(rows[0].uuid), user, function (err) {
						if (err){ logAndRespond(err, res);  return; }
						user.uuid = rows[0].uuid;
						user.name = rows[0].name;
						user.email = rows[0].email;
						user.phone = rows[0].phone;
						user.type = rows[0].type;
						connection.release();
						return res.status(200).send({ token :	generateJWT(user) });
					});		
				}
				else{
					connection.release();
					return res.redirect('/#/login/admin/forgot/invalid');
				}		
			});
		});
	}else{
		req.mysql.getConnection(function(err, connection){
			if (err){ logAndRespond(err, res); return; }
			connection.query('SELECT * FROM user WHERE resetPasswordToken= ? AND resetPasswordExpires> ?', [req.params.token, Date.now()], function (err, rows) {
				if (err){ logAndRespond(err, res); return;}
				if(rows.length){
					var user = {};
					var cipher = setPassword(req.body.password);
					user.salt = cipher.salt;
					user.hash = cipher.hash;
					user.resetPasswordToken = '';
					user.resetPasswordExpires = '';
				
					connection.query('UPDATE user SET ? WHERE uuid='+connection.escape(rows[0].uuid), user, function (err) {
						if (err){ logAndRespond(err, res);  return; }
						user.uuid = rows[0].uuid;
						user.name = rows[0].name;
						user.email = rows[0].email;
						user.phone = rows[0].phone;
						user.type = rows[0].type;
						connection.release();
						return res.status(200).send({ token :	generateJWT(user) });
					});		
				}
				else{
					connection.release();
					return res.redirect('/#/login/forgot/invalid');
				}		
			});
		});
	}
};