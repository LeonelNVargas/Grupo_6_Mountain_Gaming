const express = require('express');
const router = express.Router();
const productos = require('../controllers/productosController');

router.get('/all', productos.todoslosproductos)
router.get('/detalle/:id', productos.detalle)
router.get('/agregar', productos.agregar)
router.post('/agregar', /*productos.upload(),*/productos.publicar)
//router.get('/:id/editar', productos.editar)
//router.put('/:id')
//router.delete('/:id/eliminar', productos.eliminar)

module.exports = router