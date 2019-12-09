var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
/********************** GET *****************************/

function valueSend(res, status, message, value) {
    res.send(JSON.stringify({
        "responseCode": status,
        "message": message,
        "object": value
    }));
}

exports.getperson = function(req, res) {
    select({ _id: 0 }, 'persons', (documentos) => {
        if (documentos === undefined || documentos.length == 0) {
            valueSend(res, 400, "error", "")
        } else {
            valueSend(res, 200, "OK", documentos)
        }
    })
}

exports.getpublications = function(req, res) {
    select(req.body, 'publications', (documentos) => {
        res.send(documentos);
    })
}

exports.getpublicationsName = function(req, res) {
        select("{},{ public_title:1}", 'publications', (documentos) => {
            res.send(documentos);
        })
    }
    /********************** POST *****************************/
exports.postPerson = function(req, res) {
    insert(req.body, 'persons', (documentos) => {
        res.send(documentos);
    });
}

/********************** REMOVE *****************************/
exports.removePerson = function(req, res) {
    var id_person = parseInt(req.params.id_person);
    remove({ "id_person": id_person }, 'persons', (documentos) => {
        res.send(documentos);
    });
}

/********************** UPDATE *****************************/
exports.UpdatePerson = function(req, res) {
    console.log(req.body)
    Update({ "id_person": req.body.id_person }, req.body, 'persons', (documentos) => {
        res.send(documentos);
    });
}

function select(query, collection, callback) {
    mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("AppSenorial"); //here
        selectData(query, collection, dbase, callback)
    });
}

const selectData = async function(query, col, db, callback) {
    const collection = db.collection(col);
    collection.find({}).project(query).toArray(function(err, docs) {
        callback(docs)
    });
}

function insert(query, collection, callback) {
    mongoClient.connect(url, function(err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("AppSenorial"); //here
        insertData(query, collection, dbase, callback)
    });
}

const insertData = async function(query, col, db, callback) {
    const collection = db.collection(col);
    try {
        collection.insertOne(query);
        callback({ "status": 200, "message": "guardado exitoso" });
    } catch (error) {
        callback({ "status": 400, "message": "upsss, ocurrio un error" });
    }
}

function remove(query, collection, callback) {
    mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("AppSenorial"); //here
        removeData(query, collection, dbase, callback)
    });
}

const removeData = async function(query, col, db, callback) {
    const collection = db.collection(col);
    try {
        collection.deleteOne(query);
        callback({ "status": 200, "message": "eliminado exitoso" });
    } catch (error) {
        callback({ "status": 400, "message": "upsss, ocurrio un error" });
    }
}

function Update(condition, set, collection, callback) {
    mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("AppSenorial");
        UpdateData(condition, set, collection, dbase, callback)
    });
}

const UpdateData = async function(condition, set, col, db, callback) {
    const collection = db.collection(col);
    try {
        collection.update(condition, set);
        callback({ "status": 200, "message": "actualizacion exitosa" });
    } catch (error) {
        callback({ "status": 400, "message": "upsss, ocurrio un error" });
    }
}