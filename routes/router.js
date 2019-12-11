var body_parser = require('body-parser');
const Person = require('./Person.js')
const TypeService = require('./TypeService.js')
const CleanService = require('./CleanService.js')
const User = require('./User.js')
exports.assignRoutes = function(app, http) {

    app.use(body_parser.urlencoded({ extended: true }));
    var io = require('socket.io')(http);

    /*   
        app.post('/user', db.postUser);
        app.post('/service', db.postService);
    */
    io.on('connection', (socket) => {
        console.log('conectado')
        console.log(socket.id)

        let person = new Person(app, io);
        person.getPerson();
        person.postPerson();
        person.putPerson();
        person.deletePerson();

        let typeService = new TypeService(app);
        typeService.getTypeServices();

        let cleanService = new CleanService(app);
        cleanService.getServicesmade();
        cleanService.getServicespending();
        cleanService.postService();

        let user = new User(app);
        user.postUser();

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