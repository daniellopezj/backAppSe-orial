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
        mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) { //here db is the client obj
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