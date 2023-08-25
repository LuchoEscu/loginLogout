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

router.get('/eliminar/:id', async (req, res, next) => {
    var id  = req.params.id;
    await productosModel.deleteProductoById(id);
    res.redirect('/admin/productos');
})

router.get('/modificar/:id', async (req, res, next) => {
    var id  = req.params.id;
    var producto = await productosModel.getProductoById(id);
    console.log(id)
    console.log(producto)
    res.render('admin/modificar', {
    layout: 'admin/layout',
    producto
    })
})

router.post('/modificar', async (req, res, next) => {
    try {
        if(req.body.nombre != '' && req.body.precio != 0){
            var obj = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio
            }
            await productosModel.modProductoById(obj, req.body.id);
            res.redirect('/admin/productos');
        } else {
            res.render('admin/modificar', {
                layout: 'admin/layout',
                error: true,
                message: 'El nombre y el precio del producto es obligatorio.',
                producto: req.body
            });
        }
    } catch (error) {
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'Ocurrio un error, no se modifico el producto.'
        });
    }
})

module.exports = router;
