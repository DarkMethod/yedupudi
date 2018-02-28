var tool = require('cloneextend'),
    conf = {};
    conf.production = {
        application:    {
            errorHandler: {},
        },
        server:         {
            port        : '8080'
        },
		db:             {
            mysql:          {
                host        : '127.0.0.1',
                user        : 'root',
                password    : 'swah1l1',
                database    : 'yedupudi'
            }
        },
		frontend:		{
			folders		: ['../','../dist',]
		},
		facebookAuth:	{
			clientID      : '1590813454568088', 
			clientSecret  : 'fafc91c338b3246f0f13983118c9752c', 
			callbackURL   : 'http://ec2-52-34-0-42.us-west-2.compute.amazonaws.com/auth/facebook/callback'
		},
		googleAuth:	    {
			clientID      : '471606143428-cemgihjevs2nl1dlu4j8i704od08kseb.apps.googleusercontent.com',
			clientSecret  : '3qGx6U7yG8CO5lDczrPVMIQo',
			callbackURL   : 'http://ec2-52-34-0-42.us-west-2.compute.amazonaws.com/auth/google/callback'
		},
		mailer:			{
			smtp		: {
							host: 'smtp.gmail.com',
							port: 465,
							secure: true, // use SSL
							auth: {
									user: 'yedupudi5@gmail.com',
									pass: 'yedupudi123'
								}
						  },
			verifyEmailLink	: 'http://ec2-52-34-0-42.us-west-2.compute.amazonaws.com/auth/verify/',
			resetPasswordLink	: 'http://ec2-52-34-0-42.us-west-2.compute.amazonaws.com/auth/reset/client/',	
			adminResetPasswordLink	: 'http://ec2-52-34-0-42.us-west-2.compute.amazonaws.com/auth/reset/admin/'	
		}
    };
    conf.development = {
        db:             {
            mysql:          {
                host        : '127.0.0.1',
                user        : 'root',
                password    : 'swah1l1',
                database    : 'yedupudi'
            }
        },
        application:    {
            errorHandler: { dumpExceptions: true, showStack: true }
        },
		frontend:		{
			folders		: ['../../client_v2','../../client_v2/LAYOUT-2']
		},
		facebookAuth:	{
			clientID      : '1590813454568088', 
			clientSecret  : 'fafc91c338b3246f0f13983118c9752c', 
			callbackURL   : 'http://localhost:3000/auth/facebook/callback'
		},
		googleAuth:	    {
			clientID      : '471606143428-cemgihjevs2nl1dlu4j8i704od08kseb.apps.googleusercontent.com',
			clientSecret  : '3qGx6U7yG8CO5lDczrPVMIQo',
			callbackURL   : 'http://127.0.0.1:3000/auth/google/callback'
		},
		mailer:			{
			smtp		: {
							host: 'smtp.gmail.com',
							port:  465,
							secure: true, // use SSL
							auth: {
									user: 'yedupudi5@gmail.com',
									pass: 'yedupudi123'
								}
							},
			verifyEmailLink	: 'http://localhost:3000/auth/verify/',
			resetPasswordLink	: 'http://localhost:3000/auth/reset/client/',	
			adminResetPasswordLink	: 'http://localhost:3000/auth/reset/admin/'	
		}
    };
    conf.defaults = {
        application:    {
            jwtSecret   : 'SAOIRSE',
            routes      : ['user', 'alias', 'quote'],
            middleware  : ['compress','json','urlencoded','logger']
        },
        server:         {
            host        : 'localhost',
            port        : 3000
        }
    };

exports.get = function get(env, obj){
    var settings = tool.cloneextend(conf.defaults, conf[env]);
    return ('object' === typeof obj) ? tool.cloneextend(settings, obj) : settings;
}