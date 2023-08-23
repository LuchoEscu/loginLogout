var express = require('express');
var router = express.Router();
var productosModel = require('../../models/productosModel');

/* GET home page. */
router.get('/', async function(req, res, next) {

    var productos = await productosModel.getProductos();

    res.render('admin/inicio', { 
        layout: 'admin/layout',
        logeado: true,
        productos
    });
});

router.get('/agregar', function(req, res, next) {
    res.render('admin/agregar', { 
        layout: 'admin/layout'
    });
});

router.post('/agregar', async (req, res, next) => {
    try{
        if(req.body.nombre != '' && req.body.precio != 0){
            await productosModel.setProducto(req.body);
            res.redirect('/admin/productos');
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'El nombre y el precio del producto es obligatorio.'
            });
        }
    } catch (error) {
        console.log(error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'Ocurrio un error, no se cargo el producto.'
        });
    }
});

module.exports = router;
