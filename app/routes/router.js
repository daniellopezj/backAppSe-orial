var body_parser = require('body-parser');
const UserService = require('./userservice.js')
const User = require('./user.js')
const Person = require('./person.js')
const TypeService = require('./typeservice')
const CleanService = require('./cleanservice.js')
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

        let user = new User(app, io); // uso combinado 
        user.postUser(); // registro de usuario desde app
        user.getUsers(); // consumo de usuarios desde administrador
        user.loginUser(); // Login del usuario
        user.loginAdmin();
        user.changepassword();

        let userService = new UserService(app, io); // en esta clase hacer cambios
        userService.getUserService();
        userService.updateComment();
        userService.saveDirection();


        socket.on('disconnect', function() {
            console.log('user disconnect');
        })

        socket.on('message', (message) => {
            console.log("Message Receive" + message);
            io.emit('message', { type: 'new-message', text: message })
        })

        app.get('/', function(req, res) {
            res.send("¿? :)")
            io.emit('test-event', 'otra prueba');
        })
    })

}