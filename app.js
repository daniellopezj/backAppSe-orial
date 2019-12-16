var express = require('express');
var app = express();
var morgan = require('morgan');
var http = require('http').Server(app);

var routes = require('./routes/router');

var allowCrossDomain = function(req, res, next) {
    req.header('Access-Control-Allow-Origin', "*");
    req.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

app.use(allowCrossDomain);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

routes.assignRoutes(app, http);

http.listen(3000, () => {
    console.log('started')
})