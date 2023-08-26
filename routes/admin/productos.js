var express = require('express');
var router = express.Router();
var productosModel = require('../../models/productosModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
var uploader = util.promisify(cloudinary.uploader.upload);
var destroy = util.promisify(cloudinary.uploader.destroy);



/* GET home page. */
router.get('/', async function(req, res, next) {

    var productos = await productosModel.getProductos();

    productos = productos.map(prod => {
        if(prod.imagen){
            const imagen = cloudinary.image(prod.imagen, {
                width: 70,
                height: 70,
                crop: 'fill'
            });
            return {
                ...prod,
                imagen
            }
        } else{
            return {
                ...prod,
                imagen: ''
            }
        }
    });

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

        var imagen = '';
        
        if(req.files && Object.keys(req.files).length > 0){
            var imagenAux = req.files.imagen;
            imagen = (await uploader(imagenAux.tempFilePath)).public_id;
        }

        if(req.body.nombre != '' && req.body.precio != 0){
            await productosModel.setProducto({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                imagen: imagen
            });
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

    let prod = await productosModel.getProductoById(id);
    if (prod.imagen){
        await (destroy(prod.imagen));
    }

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
            let img_id = req.body.img_original;

            let borrar_img_vieja = false;

            if(req.body.img_delete === "1"){
                img_id = null;
                borrar_img_vieja = true;
            } else {
                if(req.files && Object.keys(req.files).length > 0){
                    imagen = req.files.imagen;
                    img_id = (await uploader(imagen.tempFilePath)).public_id;
                    borrar_img_vieja = true;
                }
            }
            if(borrar_img_vieja && req.body.img_original) {
                await (destroy(req.body.img_original))
            }

            var obj = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                imagen: img_id
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
