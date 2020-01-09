var database = require('../persistence/db');
class UserService {

    constructor(app, ioo) {
        this.app = app;
        this.database = new database();
        this.sock = ioo;
    }

    getServicespending() {
        var db = this.database;
        this.app.get('/pendientes/:id', function (req, res) {
            var id_user = req.params.id;
            console.log("Id que llega -> ", id_user);

            db.select({ $and: [{ estado: "pendiente" }, {"id_user": id_user}] }, { _id: 0 }, 'Servicios', (documentos) => {
                console.log(documentos);
                if (documentos === undefined) {
                    db.valueSend(res, 400, "error", "")
                } else {
                    db.valueSend(res, 200, "OK", documentos)
                }
            });
        })
    }

}

module.exports = UserService