const express = require('express');
const router = express.Router();
const productos = require('../controllers/productosController');
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/products')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage});

router.get('/all', productos.todoslosproductos)
router.get('/detalle/:id', productos.detalle)
router.get('/agregar', productos.agregar)
router.post('/agregar', upload.any(), productos.publicar)

router.get('/misproductos', productos.misproductos)
router.put('/editar/:id', productos.editar)
router.get('/:id/editar', productos.edit)
router.delete('/:id/eliminar', productos.delete)

module.exports = router