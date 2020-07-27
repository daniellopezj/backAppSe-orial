var database = require('../persistence/db');
class CleanService {

    constructor(app, ioo) {
        this.app = app;
        this.database = new database();
        this.sock = ioo;
        console.log("ingrese")
    }

    getCountServicespending() {
        var db = this.database;
        this.app.get('/Countpendientes', function(req, res) {
            db.selectCount({}, { "estado": "pendiente" }, 'Servicios', (documentos) => {
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
            db.select({ "estado": "pendiente" }, { _id: 0 }, 'Servicios', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.valueSend(res, 200, "OK", documentos)
                }
            });
        })
    }

    getFinishService() {
        var db = this.database;
        this.app.get('/realizados', function(req, res) {
            db.select({ $or: [{ "estado": "terminado" }, { "estado": "rechazado" }] }, { _id: 0 }, 'Servicios', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.valueSend(res, 200, "OK", documentos)
                }
            });
        })
    }

    getServicesAsiggned() {
        var db = this.database;
        this.app.get('/asignados', function(req, res) {
            db.select({ "estado": "asignado" }, { _id: 0 }, 'Servicios', (documentos) => {
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
            console.log(req.body);
            db.searchid('Servicios', (documentos) => {
                if (!(documentos === undefined || documentos.length == 0)) {
                    req.body.id_service = documentos.id_service + 1;
                }
                db.insert(req.body, 'Servicios', (documentos) => {
                    db.selectCount({}, { "estado": "pendiente" }, 'Servicios', (documentos) => {
                        if (documentos === undefined || documentos.length == 0) {
                            io.emit('countPending', 0);
                        } else {
                            io.emit('countPending', documentos);
                            db.select({ "estado": "pendiente" }, { _id: 0 }, 'Servicios', (documentos) => {
                                if (documentos !== undefined || documentos.length != 0) {
                                    io.emit('showInfoPending', documentos);
                                }
                            });
                        }
                    });
                    res.send(documentos);
                });
            });
        })
    }


    UpdateService() {
        var db = this.database;
        var io = this.sock;
        this.app.put('/actualizarServicio', function(req, res) {
            let estadoService = req.body.estado;
            console.log(estadoService)
            db.Update({ "id_service": req.body.id_service }, req.body, 'Servicios', (documentos) => {
                io.emit('finish', 'cambio');
                db.selectCount({}, { "estado": "pendiente" }, 'Servicios', (documentos) => {
                    if (documentos === undefined || documentos.length == 0) {
                        io.emit('countPending', 0);
                    } else {
                        io.emit('countPending', documentos);
                    }
                });
                res.send(documentos);
            });
        })
    }
}

module.exports = CleanService