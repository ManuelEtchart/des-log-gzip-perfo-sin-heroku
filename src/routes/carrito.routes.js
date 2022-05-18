import express from 'express';
import { carritoDELETE, carritoGET, carritoPOST, carritoProductoDELETE, carritoProductoPOST, carritosGET } from '../controllers/carrito.controller.js';
import { logger, loggerError } from '../utils/logger.js';


const carrito = express.Router()

carrito.use(express.json());
carrito.use(express.urlencoded({extended: true}));

carrito.get('', async (req,res)=>{
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        res.render('carritos', await carritosGET(req))
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
})

carrito.post('', async (req,res) => {
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        res.redirect(await carritoPOST(req))
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
})

carrito.delete('/:id', async (req,res) => {
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        res.send(await carritoDELETE(req))
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
});

carrito.get('/:id?/productos', async (req,res) => {
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        const resp = await carritoGET(req)
        res.render(resp.view, resp.vars) 
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
})

carrito.post('/:id/productos/:id_prod', async (req,res) => {
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        res.render('carrito', await carritoProductoPOST(req))
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
})

carrito.delete('/:id/productos/:id_prod', async (req,res) => {
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        res.send(await carritoProductoDELETE(req))
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
})

export default carrito