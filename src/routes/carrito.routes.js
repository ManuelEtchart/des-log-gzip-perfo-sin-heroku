import express from 'express';
import controllerCarrito from '../controllers/carrito.controller.js';


const carrito = express.Router()

carrito.use(express.json());
carrito.use(express.urlencoded({extended: true}));

carrito.get('', controllerCarrito.carritosGET)

carrito.post('', controllerCarrito.carritoPOST)

carrito.delete('/:id', controllerCarrito.carritoDELETE);

carrito.get('/:id?/productos', controllerCarrito.carritoGET)

carrito.post('/:id/productos/:id_prod', controllerCarrito.carritoProductoPOST)

carrito.get('/:id/pedir', controllerCarrito.carritoPedirGET)

carrito.delete('/:id/productos/:id_prod', controllerCarrito.carritoProductoDELETE)

export default carrito