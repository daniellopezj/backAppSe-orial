var mongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://arquitectura:arquitectura@cluster0-lwmhe.mongodb.net/appsenorial";
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

    searchid(collectionName, callback) {
        mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) { //here db is the client obj
            if (err) throw err;
            var dbase = db.db("appsenorial"); //here
            const collection = dbase.collection(collectionName);
            collection.find().limit(1).sort({ $natural: -1 }).toArray(function(err, docs) {
                callback(docs[0]);
            });
        });
    }

    select(find, query, collectionName, callback) {
        mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) { //here db is the client obj
            if (err) throw err;
            var dbase = db.db("appsenorial"); //here
            const collection = dbase.collection(collectionName);
            collection.find(find).project(query).toArray(function(err, docs) {
                callback(docs)
            });
        });
    }

    selectCount(find, query, collectionName, callback) {
        mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) { //here db is the client obj
            if (err) throw err;
            var dbase = db.db("appsenorial"); //here
            const collection = dbase.collection(collectionName);
            collection.find(query).count(function(err, docs) {
                callback(docs)
            });
        });
    }

    insert(query, col, callback) {
        mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) { //here db is the client obj
            if (err) throw err;
            var dbase = db.db("appsenorial"); //here
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
            var dbase = db.db("appsenorial"); //here
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
            var dbase = db.db("appsenorial");
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