var body_parser = require('body-parser');
var db = require('../persistence/db');
exports.assignRoutes = function(app) {
    app.use(body_parser.urlencoded({ extended: true }));

    //REALIZA LA CONEXION Y LA INSERCION DE DATOS EN MONGO 
    // db.connectDB();


    //*************SOLICITUDES GET******************
    app.get('/person', db.getperson);

    app.get('/publications', db.getpublications);
    app.get('/namePublications', db.getpublicationsName);
    //*************SOLICITUDES POST******************
    app.post('/person', db.postPerson);

    //*************SOLICITUDES REMOVE******************
    app.delete('/person/:id_person', db.removePerson);

    //*************SOLICITUDES REMOVE******************
    app.put('/person', db.UpdatePerson);

}