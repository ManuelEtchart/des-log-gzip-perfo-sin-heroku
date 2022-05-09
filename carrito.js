import express from 'express';
import { mensajesMonDB } from './mensajes.js';
import { productosMongoDB } from './productos.js';
import { logger,loggerError } from './server.js';
import CarritoDaoMongoDB from './src/DAOs/carritoDaoMongoDB.js'
const carrito = express.Router();


const carritoMongoDB = new CarritoDaoMongoDB();

carrito.use(express.json());
carrito.use(express.urlencoded({extended: true}));

carrito.get('', async (req,res)=>{
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        res.render('carritos',{carritos: await carritoMongoDB.getAll(), mensajes: await mensajesMonDB.getAll()})
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
})

carrito.post('', async (req,res) => {
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        await carritoMongoDB.save(
            {
                timestamp: Date.now(),
                productos: []
            }
        );
        res.redirect('/api/carrito')
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
})

carrito.delete('/:id', async (req,res) => {
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        res.json(await carritoMongoDB.deleteById(req.params.id))
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
});

carrito.get('/:id?/productos', async (req,res) => {
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        if(req.params.id === undefined){
            res.render('carritos',{carritos: await carritoMongoDB.getAll(), mensajes: await mensajesMonDB.getAll()})
        }else{
            res.render('carrito', {carritos: await carritoMongoDB.getById(req.params.id), mensajes: await mensajesMonDB.getAll(), productos: await productosMongoDB.getAll()})
        } 
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
})

carrito.post('/:id/productos/:id_prod', async (req,res) => {
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        await carritoMemoria.agregarProductoEnCarrito(req.params.id, req.params.id_prod)
        res.render('carrito', {carritos: await carritoMongoDB.getById(req.params.id), mensajes: await mensajesMonDB.getAll(), productos: await productosMongoDB.getAll()})
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
})

carrito.delete('/:id/productos/:id_prod', async (req,res) => {
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        res.json( await carritoMongoDB.borrarProductoEnCarrito(req.params.id,req.params.id_prod))
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
})


export default carrito;