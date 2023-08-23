var pool = require('./db');

async function getProductos() {
    try{
        var query = 'select * from productos order by id desc';
        var rows = await pool.query(query);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function setProducto(obj) {
    try{
        var query = 'insert into productos set ?';
        var rows = await pool.query(query, [obj]);
        return rows;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {getProductos, setProducto}