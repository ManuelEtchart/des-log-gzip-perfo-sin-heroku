import express from 'express';
import ControllerCarrito from '../controllers/carrito.controller.js';


const carrito = express.Router();

carrito.use(express.json());
carrito.use(express.urlencoded({extended: true}));

class CarritoRouter{
    constructor(){
        this.controller = new ControllerCarrito()
    }

    start(){
        carrito.get('', this.controller.carritosGET)

        carrito.post('', this.controller.carritoPOST)

        carrito.delete('/:id', this.controller.carritoDELETE);

        carrito.get('/:id?/productos', this.controller.carritoGET)

        carrito.post('/:id/productos/:id_prod', this.controller.carritoProductoPOST)

        carrito.get('/:id/pedir', this.controller.carritoPedirGET)

        carrito.delete('/:id/productos/:id_prod', this.controller.carritoProductoDELETE)

        return carrito
    }
}

export default CarritoRouter;