var pool = require('./db');
var md5 = require('md5');

async function getUserByUsuarioAndPass(user, pass) {
    try{
        var query = 'select * from usuarios where usuario = ? and clave = ?'
        var rows = await pool.query(query, [user, md5(pass)]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getUserByUsuarioAndPass}