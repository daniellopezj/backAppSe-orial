var database = require('../persistence/db');
class CleanService {

    constructor(app) {
        this.app = app;
        this.database = new database();
    }

    getServicespending() {
        var db = this.database;
        //var io = this.sock;
        this.app.get('/pendientes', function(req, res) {
            db.select({}, { _id: 0 }, 'Servicios', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.valueSend(res, 200, "OK", documentos)
                        //io.emit('test-event', 'otra prueba');
                }
            });
        })
    }

    getServicesmade() {
        var db = this.database;
        //var io = this.sock;
        this.app.get('/realizados', function(req, res) {
            db.select({}, { _id: 0 }, 'Servicios', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.valueSend(res, 200, "OK", documentos)
                        //io.emit('test-event', 'otra prueba');
                }
            });
        })
    }

    postService() {
        var db = this.database;
        this.app.post('/service', function(req, res) {
            console.log(req.body);
            db.insert(req.body, 'Servicios', (documentos) => {
                res.send(documentos);
            });
        })
    }
}

module.exports = CleanService