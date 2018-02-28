var uuid = require('node-uuid');
var logAndRespond = function logAndRespond(err,res,status){
    console.error(err);
    res.statusCode = ('undefined' === typeof status ? 500 : status);
    res.send({
        result: 'error',
        err:    err.code
    });
};
var today = function(){
	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = dd+'/'+mm+'/'+yyyy;
	return today;
}; 
var handleConnection = function handleConnection(callback,req,res){
    req.mysql.getConnection(function(err,connection){
        if (err){ logAndRespond(err,res); return; }
        callback(connection,req,res);
    });
};
function handleGet(connection,req,res) {
    var limit = ('undefined' === typeof req.params.limit) ? 20: req.params.limit;
    connection.query('SELECT * FROM quote ORDER BY dateOfRequest DESC LIMIT ' + limit, function handleSql(err, rows) {
        if (err){ logAndRespond(err,res); return; }
        if (rows.length === 0){ res.send(204); return; }
        res.send({
            result: 'success',
            err:    '',
            json:   rows,
            length: rows.length
        });
        connection.release();
    });
}
function handleFind(connection,req,res){
     var find = function find(){
        connection.query('SELECT * FROM quote WHERE email = ?', req.params.id, function handleSql(err, rows) {
            if (err){ logAndRespond(err,res); return; }
            if (rows.length === 0){ res.send(204); return; }
            res.send({
                json:   rows,
            });
            connection.release();
        });
    };
    var cacheFind = req.cache(find, { async: true, maxAge: 1000*60, preFetch: true });
    cacheFind(req.params.id);
}
function handleIns(connection,req,res) {
	
	req.body.uuid = uuid.v4();
	if(req.body.items){
		req.body.items = req.body.items.toString();
	}
	req.body.dateOfRequest = today();
	
	connection.query('INSERT INTO quote SET ?', req.body, function handleSql(err, result) {
        if (err){ logAndRespond(err,res); return; }
        res.statusCode = 201;
        res.send({
            result: 'success',
            err:    '',
            id:     result.insertId
        });
        connection.release();
    });
}
function handleUpd(connection,req,res) {
    connection.query('UPDATE quote SET ? WHERE uuid='+connection.escape(req.params.id), req.body, function handleSql(err) {
        if (err){ logAndRespond(err,res); return; }
        res.statusCode = 200;
        res.send({
            result: 'success',
            err:    '',
            id:     req.params.id
        });
    });
}
function handleDel(connection,req,res) {
    connection.query('DELETE FROM quote WHERE uuid = ?', req.params.id, function handleSql(err) {
        if (err){ logAndRespond(err,res); return; }
        res.send({
            result: 'success',
            err:    '',
            id:     req.params.id
        });
        connection.release();
    });
}

exports.get = function(req,res){
    handleConnection(handleGet,req,res);
};
exports.find = function(req,res){
    handleConnection(handleFind,req,res);
};
exports.ins = function(req,res){
    handleConnection(handleIns,req,res);
};
exports.upd = function(req,res){
    handleConnection(handleUpd,req,res);
};
exports.del = function(req,res){
    handleConnection(handleDel,req,res);
};