var body_parser = require('body-parser');
const Person = require('./Person.js')
const TypeService = require('./TypeService.js')
const CleanService = require('./CleanService.js')
const User = require('./User.js')

exports.assignRoutes = function(app, http) {

    app.use(body_parser.urlencoded({ extended: true }));
    var io = require('socket.io')(http);

    io.on('connection', (socket) => {
        console.log('connect user ' + socket.id)

        let person = new Person(app, io); //colaboradores en administrador
        person.getPerson();
        person.postPerson();
        person.putPerson();
        person.deletePerson();
        person.serchid();

        let typeService = new TypeService(app); // tipo
        typeService.getTypeServices();

        let cleanService = new CleanService(app, io); // uso de administrador
        cleanService.getCountServicespending();
        cleanService.getServicesPending();
        cleanService.getServicesAsiggned();
        cleanService.postService();
        cleanService.getFinishService();
        cleanService.UpdateService();

        let user = new User(app); // uso combinado 
        user.postUser(); // registro de usuario desde app
        user.getUsers(); // consumo de usuarios desde administrador

        let userService = new UserService(app, io); // en esta clase hacer cambios

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