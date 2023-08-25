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

async function deleteProductoById(id) {
    var query = 'delete from productos where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getProductoById (id) {
    try{
        var query = 'select * from productos where id = ?';
        var rows = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function modProductoById (obj, id) {
    try{
        var query = 'update productos set ? where id = ?';
        var rows = pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {getProductos, setProducto, deleteProductoById, getProductoById, modProductoById}