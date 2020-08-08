var express = require('express');
var app = express();
var morgan = require('morgan');
var http = require('http').Server(app);

var routes = require('./app/routes/router');

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

console.log("************************")
console.log("Se han cargado los cambios")
console.log("************************")
routes.assignRoutes(app, http);

app.get('/', function(req, res) {
    res.send("¿En que podemos ayudarte ayudarte? :),  contactanos: daniel lopez https://github.com/daniellopezj01")
})
http.listen(process.env.PORT || 3000, () => {
    console.log('started')
})