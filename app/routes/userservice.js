var database = require('../persistence/db');
class UserService {

    constructor(app, ioo) {
        this.app = app;
        this.database = new database();
        this.sock = ioo;
    }

    getUserService() {
        var db = this.database;
        this.app.get('/serviciosUsuario/:id/:estado', function (req, res) {
            var id = parseInt(req.params.id);
            var estado = req.params.estado;
            db.select({ $and: [{ "estado": estado }, { "id_user": id }] },
                { _id: 0, id_service: 1, fecha_servicio: 1, nombreCategoria: 1, direccion: 1, valor: 1, comentario: 1 },
                'Servicios', (documentos) => {
                    if (documentos === undefined) {
                        db.valueSend(res, 400, "error", "")
                    } else {
                        db.valueSend(res, 200, "OK", documentos)
                    }
                });
        })
    }

    updateComment() {
        var db = this.database;
        this.app.put('/saveComment', function (req, res) {
            let comentario = req.body.comentario;
            db.Update({ "id_service": req.body.id }, { $set: { comentario: comentario } }, 'Servicios', (documentos) => {
                res.send(documentos);
            });
        });
    }

    saveDirection() {
        var db = this.database;
        this.app.put('/saveDirection/:id', function (req, res) {
            var id = parseInt(req.params.id);
            let direction = req.body.direction;
            db.Update({ "id_user": id }, { $push: { direccion: direction } }, 'Usuarios', (documentos) => {
                res.send(documentos);
            });
        });
    }
}

module.exports = UserService