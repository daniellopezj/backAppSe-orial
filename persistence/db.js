var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
/********************** GET *****************************/
class conecctionMongo {
    constructor(app) {
        this.app = app;
    }

    valueSend(res, status, message, value) {
        res.send(JSON.stringify({
            "responseCode": status,
            "message": message,
            "object": value
        }));
    }

    /*
    exports.getServicespending = function(req, res) {
        select({}, { _id: 0 }, 'Servicios', (documentos) => {
            if (documentos === undefined || documentos.length == 0) {
                valueSend(res, 400, "error", "")
            } else {
                valueSend(res, 200, "OK", documentos)
            }
        })
    }

    exports.getServicesmade = function(req, res) {
        select({}, { _id: 0 }, 'Servicios', (documentos) => {
            if (documentos === undefined || documentos.length == 0) {
                valueSend(res, 400, "error", "")
            } else {
                valueSend(res, 200, "OK", documentos)
            }
        })
    }

    exports.getTypeServices = function(req, res) {
            select({}, { _id: 0 }, 'TipoServicios', (documentos) => {
                if (documentos === undefined || documentos.length == 0) {
                    valueSend(res, 400, "error", "")
                } else {
                    valueSend(res, 200, "OK", documentos)
                }
            })
        }
        /********************** POST *****************************/
    /*


    exports.postService = function(req, res) {
        insert(req.body, 'Servicios', (documentos) => {
            res.send(documentos);
        });
    }

    exports.postUser = function(req, res) {
        insert(req.body, 'Usuarios', (documentos) => {
            res.send(documentos);
        });
    }

    /********************** REMOVE *****************************/
    /*exports.removePerson = function(req, res) {
        var id_person = parseInt(req.params.id_person);
        remove({ "id_person": id_person }, 'Colaboradores', (documentos) => {
            res.send(documentos);
        });
    }

    /********************** UPDATE *****************************/
    /*exports.UpdatePerson = function(req, res) {
        console.log(req.body)
        Update({ "id_person": req.body.id_person }, req.body, 'Colaboradores', (documentos) => {
            res.send(documentos);
        });
    }
    */

    select(find, query, collectionName, callback) {
        mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) { //here db is the client obj
            if (err) throw err;
            var dbase = db.db("AppSenorial"); //here
            const collection = dbase.collection(collectionName);
            collection.find(find).project(query).toArray(function(err, docs) {
                callback(docs)
            });
        });
    }

    insert(query, col, callback) {
        mongoClient.connect(url, { useNewUrlParser: true }, function(err, db) { //here db is the client obj
            if (err) throw err;
            var dbase = db.db("AppSenorial"); //here
            const collection = dbase.collection(col);
            try {
                collection.insertOne(query);
                callback({ "status": 200, "message": "guardado exitoso" });
            } catch (error) {
                callback({ "status": 400, "message": "upsss, ocurrio un error" });
            }
        });
    }

    remove(query, col, callback) {
        mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) { //here db is the client obj
            if (err) throw err;
            var dbase = db.db("AppSenorial"); //here
            const collection = dbase.collection(col);
            try {
                collection.deleteOne(query);
                callback({ "status": 200, "message": "eliminado exitoso" });
            } catch (error) {
                callback({ "status": 400, "message": "upsss, ocurrio un error" });
            }
        });
    }

    Update(condition, set, col, callback) {
        mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) { //here db is the client obj
            if (err) throw err;
            var dbase = db.db("AppSenorial");
            const collection = dbase.collection(col);
            try {
                collection.update(condition, set);
                callback({ "status": 200, "message": "actualizacion exitosa" });
            } catch (error) {
                callback({ "status": 400, "message": "upsss, ocurrio un error" });
            }
        });
    }
}

module.exports = conecctionMongo