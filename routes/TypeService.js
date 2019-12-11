var database = require('../persistence/db');
class TypeService {

    constructor(app) {
        this.app = app;
        this.database = new database();
    }

    getTypeServices() {
        var db = this.database;
        //var io = this.sock;
        this.app.get('/tipoServicio', function(req, res) {
            db.select({}, { _id: 0 }, 'TipoServicios', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.valueSend(res, 200, "OK", documentos)
                        //io.emit('test-event', 'otra prueba');
                }
            });
        })
    }


}

module.exports = TypeService