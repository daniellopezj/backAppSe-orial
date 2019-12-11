var body_parser = require('body-parser');
var db = require('../persistence/db');
const person = require('./Person.js')

exports.assignRoutes = function(app, http) {

    app.use(body_parser.urlencoded({ extended: true }));
    var io = require('socket.io')(http);

    //*************SOLICITUDES GET******************
    /* app.get('/tipoServicio', db.getTypeServices);
    app.get('/pendientes', db.getServicespending);
    app.get('/realizados', db.getServicesmade);
    // app.get('/namePublications', db.getpublicationsName);
    //*************SOLICITUDES POST******************
   
    app.post('/user', db.postUser);
    app.post('/service', db.postService);

    //*************SOLICITUDES REMOVE******************
 

    //*************SOLICITUDES REMOVE******************
    app.put('/person', db.UpdatePerson);
*/
    io.on('connection', (socket) => {
        console.log('conectado')
        console.log(socket.id)

        let p = new person(app, io);
        p.getPerson();
        p.postPerson();
        p.putPerson();
        p.deletePerson();

        socket.on('disconnect', function() {
            console.log('user disconnect');
        })

        socket.on('message', (message) => {
            console.log("Message Receive" + message);
            io.emit('message', { type: 'new-message', text: message })
        })

        app.get('/', function(req, res) {
            res.send("¿se te perdio algo? :)")
            io.emit('test-event', 'otra prueba');
        })
    })

}