var database = require('../persistence/db');
class CleanService {

    constructor(app, ioo) {
        this.app = app;
        this.database = new database();
        this.sock = ioo;
    }

    getCountServicespending() {
        var db = this.database;
        this.app.get('/Countpendientes', function(req, res) {
            db.selectCount({}, { "status": "pendiente" }, 'Servicios', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.valueSend(res, 200, "OK", documentos)
                }
            });
        })
    }

    getServicesPending() {
        var db = this.database;
        this.app.get('/pendientes', function(req, res) {
            db.select({ "status": "pendiente" }, { _id: 0 }, 'Servicios', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.valueSend(res, 200, "OK", documentos)
                }
            });
        })
    }

    getServicesmade() {
        var db = this.database;
        this.app.get('/realizados', function(req, res) {
            db.select({}, { _id: 0 }, 'Servicios', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.valueSend(res, 200, "OK", documentos)
                }
            });
        })
    }

    postService() {
        var db = this.database;
        var io = this.sock;
        this.app.post('/service', function(req, res) {
            db.searchid('Servicios', (documentos) => {
                req.body.id_service = documentos.id_service + 1;
                db.insert(req.body, 'Servicios', (documentos) => {
                    db.selectCount({}, { "status": "pendiente" }, 'Servicios', (documentos) => {
                        if (documentos === undefined || documentos.length == 0) {
                            io.emit('countPending', 0);
                        } else {
                            io.emit('countPending', documentos);
                        }
                    });
                    res.send(documentos);
                });
            });
        })
    }
}

module.exports = CleanService