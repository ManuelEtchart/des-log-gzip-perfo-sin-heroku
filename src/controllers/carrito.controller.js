import CarritoDaoMongoDB from "../DAOs/carritoDaoMongoDB.js";
import ContenedorMemoria from "../DAOs/DAOMemoria.js";
import MensajesDaoMongoDB from "../DAOs/mensajesDaoMongoDB.js";
import ProductosDaoMongoDB from "../DAOs/productosDaoMongoDB.js";
import { loggerError, logger } from "../utils/logger.js";
import minimist from 'minimist';

let options = {alias: {p: 'persistencia'}}
let args = minimist(process.argv, options)

let carrito = null;
let mensajes = null;
let productos = null;

switch (args.persistencia) {
    case 'mongoDB':
        carrito = new CarritoDaoMongoDB()
        mensajes = new MensajesDaoMongoDB()
        productos = new ProductosDaoMongoDB()
        break;
    case 'memoria':
        carrito = new ContenedorMemoria()
        mensajes = new ContenedorMemoria()
        productos = new ContenedorMemoria()
        break
    default:
        break;
}

const controllerCarrito = {
    carritosGET: async (req,res)=>{
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            res.render('carritos', {carritos: await carrito.getAll(), mensajes: await mensajes.getAll()})
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
                res.render('carritos', {carritos: await carrito.getAll(), mensajes: await mensajes.getAll()})
            }else{
                res.render('carrito', {carritos: await carrito.getById(req.params.id), mensajes: await mensajes.getAll(), productos: await productos.getAll()})
            }
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    carritoProductoPOST: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            await carrito.agregarProductoEnCarrito(req.params.id, req.params.id_prod)
            res.render('carrito', {carritos: await carrito.getById(req.params.id), mensajes: await mensajes.getAll(), productos: await productos.getAll()})
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    carritoPedirGET: async (req,res)=>{
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            res.render('pedido', {carritos: await carrito.getById(req.params.id)})
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    carritoProductoDELETE: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            res.send(await carrito.borrarProductoEnCarrito(req.params.id,req.params.id_prod))
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }
}

export default controllerCarrito

