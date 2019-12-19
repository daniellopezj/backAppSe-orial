var database = require('../persistence/db');
class Person {

    constructor(app, ioo) {
        this.app = app;
        this.database = new database();
        this.sock = ioo;
    }

    getPerson() {
        var db = this.database;
        //var io = this.sock;
        this.app.get('/person', function(req, res) {
            db.select({}, { _id: 0 }, 'Colaboradores', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.valueSend(res, 200, "OK", documentos)
                        //io.emit('test-event', 'otra prueba');
                }
            });
        })
    }

    async postPerson() {
        var db = this.database;
        this.app.post('/person', function(req, res) {
            db.searchid('Colaboradores', (documentos) => {
                req.body.id_person = documentos.id_person + 1;
                db.insert(req.body, 'Colaboradores', (documentos) => {
                    res.send(documentos);
                });
            });
        })
    }

    serchid() {
        var db = this.database;
        //var io = this.sock;
        this.app.get('/searchid', function(req, res) {
            db.searchid('Colaboradores', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.valueSend(res, 200, "OK", documentos)
                        //io.emit('test-event', 'otra prueba');
                }
            });
        })
    }
    deletePerson() {
        var db = this.database;
        this.app.delete('/person/:id_person', function(req, res) {
            var id_person = parseInt(req.params.id_person);
            db.remove({ "id_person": id_person }, 'Colaboradores', (documentos) => {
                res.send(documentos);
            });
        });
    }

    putPerson() {
        var db = this.database;
        this.app.put('/person', function(req, res) {
            console.log(req.body)
            db.Update({ "id_person": req.body.id_person }, req.body, 'Colaboradores', (documentos) => {
                res.send(documentos);
            });
        })
    }
}

module.exports = Person