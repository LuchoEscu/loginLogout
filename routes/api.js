var express = require('express');
var router = express.Router();
var productosModel = require('./../models/productosModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');

router.get('/productos', async function (req, res, next) {
    var productos = await productosModel.getProductos();

    productos = productos.map(prod => {
        if (prod.imagen) {
            const imagen = cloudinary.url(prod.imagen, {
                width: 250,
                height: 250,
                crop: 'fill'
            });
            return {
                ...prod,
                imagen
            }
        } else {
            return {
                ...prod,
                imagen: ''
            }
        }
    });
    res.json(productos);
})

router.post('/contacto', async (req, res) => {
    const mail = {
        to: 'lucianodescudero98@gmail.com.ar',
        subject: 'Contacto web',
        html: `${req.body.nombre} se contacto a travez de la web y quiere más información a este correo: ${req.body.email}
        <br> Mensaje: ${req.body.mensaje}
        <br> Teléfono: ${req.body.telefono}
        `}

    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transport.sendMail(mail)

    res.status(201).json({
        error: false,
        message: "Mensaje enviado."
    });

})

module.exports = router;
