var database = require('../persistence/db');
class User {

    constructor(app, ioo) {
        this.app = app;
        this.database = new database();
        this.sock = ioo;
    }

    postUser() {
        var db = this.database;
        this.app.post('/user', function(req, res) {
            db.searchid('Usuarios', (documentos) => {
                req.body.id_user = documentos.id_user + 1;
                db.insert(req.body, 'Usuarios', (documentos) => {
                    res.send(documentos);
                });
            });
        })
    }
}

module.exports = User