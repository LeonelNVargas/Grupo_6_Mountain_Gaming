const express = require('express');
const router = express.Router();
const detalleProducto = require('../controllers/productoController');

router.get('/', detalleProducto.detalle)
router.get('/agregar', detalleProducto.agregar)

module.exports = router