import CarritoDaoMongoDB from "../DAOs/carritoDaoMongoDB.js";
import { loggerError, logger } from "../utils/logger.js";
import { mensajesMonDB } from "./mensajes.controller.js";
import { productosMongoDB } from "./productos.controller.js";

const carritoMongoDB = new CarritoDaoMongoDB();

const controllerCarrito = {
    carritosGET: async (req,res)=>{
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            res.render('carritos', {carritos: await carritoMongoDB.getAll(), mensajes: await mensajesMonDB.getAll()})
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    carritoPOST: async (req,res) => {
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
    },

    carritoDELETE: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            res.send(await carritoMongoDB.deleteById(req.params.id))
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    carritoGET: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            if(req.params.id === undefined){
                res.render('carritos', {carritos: await carritoMongoDB.getAll(), mensajes: await mensajesMonDB.getAll()})
            }else{
                res.render('carrito', {carritos: await carritoMongoDB.getById(req.params.id), mensajes: await mensajesMonDB.getAll(), productos: await productosMongoDB.getAll()})
            }
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    carritoProductoPOST: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            await carritoMongoDB.agregarProductoEnCarrito(req.params.id, req.params.id_prod)
            res.render('carrito', {carritos: await carritoMongoDB.getById(req.params.id), mensajes: await mensajesMonDB.getAll(), productos: await productosMongoDB.getAll()})
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    carritoProductoDELETE: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            res.send(await carritoMongoDB.borrarProductoEnCarrito(req.params.id,req.params.id_prod))
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }
}

export default controllerCarrito