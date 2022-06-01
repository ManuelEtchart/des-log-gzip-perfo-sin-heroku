import express from 'express';
import { controllerProductos } from '../controllers/productos.controller.js';

const productos = express.Router()

productos.use(express.json());
productos.use(express.urlencoded({extended: true}));


productos.get('/form', controllerProductos.productosFormGET);

productos.get('/:id?', controllerProductos.productosGET);

productos.post('', controllerProductos.productosPOST);

productos.put('/:id', controllerProductos.productosPUT)

productos.delete('/:id', controllerProductos.productosDELETE)

export default productos