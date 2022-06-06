import express from 'express';
import ControllerProductos  from '../controllers/productos.controller.js';

const productos = express.Router()

productos.use(express.json());
productos.use(express.urlencoded({extended: true}));

class ProductosRouter {
    constructor(){
        this.controller = new ControllerProductos()
    }

    start(){
        productos.get('/form', this.controller.productosFormGET);

        productos.get('/:id?', this.controller.productosGET);

        productos.post('', this.controller.productosPOST);

        productos.put('/:id', this.controller.productosPUT)

        productos.delete('/:id', this.controller.productosDELETE)

        return productos
    }
}

export default ProductosRouter;