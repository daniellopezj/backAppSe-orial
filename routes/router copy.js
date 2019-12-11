var body_parser = require('body-parser');
var db = require('../persistence/db');
exports.assignRoutes = function(app, http) {

    app.use(body_parser.urlencoded({ extended: true }));
    var io = require('socket.io')(http);

    //*************SOLICITUDES GET******************
    app.get('/person', db.getperson);
    app.get('/tipoServicio', db.getTypeServices);
    app.get('/pendientes', db.getServicespending);
    app.get('/realizados', db.getServicesmade);
    // app.get('/namePublications', db.getpublicationsName);
    //*************SOLICITUDES POST******************
    app.post('/person', db.postPerson);
    app.post('/user', db.postUser);
    app.post('/service', db.postService);

    //*************SOLICITUDES REMOVE******************
    app.delete('/person/:id_person', db.removePerson);

    //*************SOLICITUDES REMOVE******************
    app.put('/person', db.UpdatePerson);

    io.on('connection', (socket) => {
        console.log('conectado')
        console.log(socket.id)
        socket.on('disconnect', function() {
            console.log('user disconnect');
        })

        socket.on('message', (message) => {
            console.log("Message Receive" + message);
            io.emit('message', { type: 'new-message', text: message })
        })

        app.get('/', function(req, res) {
            res.send("hola esto es una prueba")
            io.emit('test-event', 'otra prueba');
        })
    })

}