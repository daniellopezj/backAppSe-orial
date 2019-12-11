var express = require('express');
var app = express();
var morgan = require('morgan');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var routes = require('./routes/router');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

app.use(allowCrossDomain);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

routes.assignRoutes(app);

io.on('connection', (socket) => {
    console.log('conectado')

    socket.on('disconnect', function() {
        console.log('user disconnect');
    })

    socket.on('message', (message) => {
        console.log("Message Receive" + message);
        io.emit('message', { type: 'new-message', text: message })
    })

    app.get('/', function(req, res) {
        res.send("hola esto es una prueba")
        socket.emit('test-event', 'THIS is SOME NEW DATA!!!');
    })
})


http.listen(3000, () => {
    console.log('started')
})