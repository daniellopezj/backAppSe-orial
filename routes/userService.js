var database = require('../persistence/db');
class UserService {

    constructor(app, ioo) {
        this.app = app;
        this.database = new database();
        this.sock = ioo;
    }

    getUserService() {
        var db = this.database;
        this.app.get('/serviciosUsuario/:id/:estado', function(req, res) {
            var id = parseInt(req.params.id);
            var estado = req.params.estado
            db.select({ $and: [{ "estado": estado }, { "id_user": id }] }, { _id: 0 }, 'Servicios', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.valueSend(res, 200, "OK", documentos)
                }
            });
        })
    }
}

module.exports = UserService