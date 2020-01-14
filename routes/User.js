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
        var io = this.sock;
        this.app.post('/user', function(req, res) {
            db.searchid('Usuarios', (documentos) => {
                if (!(documentos === undefined || documentos.length == 0)) {
                    req.body.id_user = documentos.id_user + 1;
                }
                db.insert(req.body, 'Usuarios', (documentos) => {
                    io.emit('insertUser', "value");
                    res.send(documentos);
                });
            });
        })
    }

    loginUser() {
        var db = this.database;
        this.app.post('/loginUser', function(req, res) {
            let email = req.body.email;
            let pass = req.body.password;
            db.select({ correo: email, contrasena: pass }, { _id: 0 }, 'Usuarios', (documentos) => {
                console.log(documentos);
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.valueSend(res, 200, "OK", documentos)
                }
            });
        });
    }

    loginAdmin() {
        var db = this.database;
        this.app.post('/loginAdmin', function(req, res) {
            let user = req.body.user;
            let password = req.body.password;
            db.select({ user: user, password: password }, { _id: 0, password: 0 }, 'admin', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.valueSend(res, 200, "OK", documentos)
                }
            });
        });
    }

    changepassword() {
        var db = this.database;
        var io = this.sock;
        this.app.put('/actualizarpassword', function(req, res) {
            let user = req.body.user;
            let password = req.body.password;
            let newpassword = req.body.newpassword;
            db.select({ user: user, password: password }, { _id: 0, password: 0 }, 'admin', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.Update({ "user": user }, { $set: { password: newpassword } }, 'admin', (documentos) => {
                        db.valueSend(res, 200, "OK", documentos)
                    });
                }
            });
        })
    }
}

module.exports = User