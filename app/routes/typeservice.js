var database = require('../persistence/db');
class TypeService {

    constructor(app) {
        this.app = app;
        this.database = new database();
    }

    getTypeServices() {
        var db = this.database;
        this.app.get('/tipoServicio', function (req, res) {
            db.select({}, { _id: 0, servicios: 0 }, 'TipoServicios', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.valueSend(res, 200, "OK", documentos)
                }
            });
        })
    }

    getServicesOfType() {
        var db = this.database;
        this.app.get('/servicesType/:id_category', function (req, res) {
            var id = parseInt(req.params.id_category);
            db.select({ 'id_category': id }, { _id: 0, servicios: 1 }, 'TipoServicios', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    console.log(documentos);

                    db.valueSend(res, 200, "OK", documentos)
                }
            });
        })
    }
}

module.exports = TypeService