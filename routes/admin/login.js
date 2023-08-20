var express = require('express');
var router = express.Router();
var usuariosModel = require('../../models/usuarioModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = Boolean(req.session.id_usuario);
  if(user){
    res.redirect('/admin/inicio');
  } else {
    res.render('admin/login', {
      layout: 'admin/layout'
    });
  }
});

router.get('/logout', function (req, res) {
  var logout = Boolean(req.session.id_usuario);
  req.session.destroy();
  if(logout){
    res.render('admin/login', {
      layout: 'admin/layout',
      logout: logout
    })
  } else {
    res.redirect('/');
  }
});

router.post('/', async (req, res, next) => {
  try {
    var usuario = req.body.user;
    var pass = req.body.pass;

    var data = await usuariosModel.getUserByUsuarioAndPass(usuario, pass);

    if (data != undefined) {
      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;
      res.redirect('/admin/inicio');
    } else {
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }

  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
