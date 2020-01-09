var database = require('../persistence/db');
class UserService {

    constructor(app, ioo) {
        this.app = app;
        this.database = new database();
        this.sock = ioo;
    }



}

module.exports = UserService