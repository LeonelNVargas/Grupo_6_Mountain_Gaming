const express = require('express');
const router = express.Router();
const detalleProducto = require('../controllers/productoController');

router.get('/', detalleProducto.detalle)

module.exports = router