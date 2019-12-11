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
    select({}, { _id: 0 }, 'Colaboradores', (documentos) => {
        if (documentos === undefined || documentos.length == 0) {
            valueSend(res, 400, "error", "")
        } else {
            valueSend(res, 200, "OK", documentos)
        }
    })
}

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
exports.postPerson = function(req, res) {
    insert(req.body, 'Colaboradores', (documentos) => {
        res.send(documentos);
    });
}


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
exports.removePerson = function(req, res) {
    var id_person = parseInt(req.params.id_person);
    remove({ "id_person": id_person }, 'Colaboradores', (documentos) => {
        res.send(documentos);
    });
}

/********************** UPDATE *****************************/
exports.UpdatePerson = function(req, res) {
    console.log(req.body)
    Update({ "id_person": req.body.id_person }, req.body, 'Colaboradores', (documentos) => {
        res.send(documentos);
    });
}

function select(find, query, collection, callback) {
    mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("AppSenorial"); //here
        selectData(find, query, collection, dbase, callback)
    });
}

const selectData = async function(find, query, col, db, callback) {
    const collection = db.collection(col);
    collection.find(find).project(query).toArray(function(err, docs) {
        callback(docs)
    });
}

function insert(query, collection, callback) {
    mongoClient.connect(url, { useNewUrlParser: true }, function(err, db) { //here db is the client obj
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