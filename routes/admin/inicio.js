var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin/inicio', { 
        layout: 'admin/layout',
        logeado: true
    });
});

module.exports = router;
