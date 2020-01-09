var database = require('../persistence/db');
class User {

    constructor(app, ioo) {
        this.app = app;
        this.database = new database();
        this.sock = ioo;
    }

    getUsers() {
        var db = this.database;
        this.app.get('/usuarios', function(req, res) {
            db.select({}, { _id: 0 }, 'Usuarios', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.valueSend(res, 200, "OK", documentos)
                }
            });
        })
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