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

    postPerson() {
        var db = this.database;
        this.app.post('/person', function(req, res) {
            console.log(req.body);
            db.insert(req.body, 'Colaboradores', (documentos) => {
                res.send(documentos);
            });
        })
    }


}

module.exports = Person