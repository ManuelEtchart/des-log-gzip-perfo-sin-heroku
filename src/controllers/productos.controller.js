import ContenedorMemoria from "../DAOs/DAOMemoria.js";
import MensajesDaoMongoDB from "../DAOs/mensajesDaoMongoDB.js";
import ProductosDaoMongoDB from "../DAOs/productosDaoMongoDB.js";
import { loggerError, logger } from "../utils/logger.js";
import minimist from "minimist";

let options = {alias: {p: 'persistencia'}}
let args = minimist(process.argv, options)

let mensajes = null;
let productos = null;

switch (args.persistencia) {
    case 'mongoDB':
        mensajes = new MensajesDaoMongoDB()
        productos = new ProductosDaoMongoDB()
        break;
    case 'memoria':
        mensajes = new ContenedorMemoria()
        productos = new ContenedorMemoria()
        break
    default:
        break;
}

const administrador = true;

const controllerProductos = {
    productosFormGET: async (req,res)=>{
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            res.render('productosForm', {mensajes: await mensajes.getAll()});
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    productosGET: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            if (req.params.id === undefined) {
                res.render('inicio', {productos: await productos.getAll(), mensajes: await mensajes.getAll()})
            }else{
                res.render('producto', {producto: await productos.getById(req.params.id), mensajes: await mensajes.getAll()})
            } 
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    productosPOST: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try{
            if(administrador){
            
                await productos.save({
                    timestamp: Date.now(),
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    codigo: req.body.codigo,
                    foto: req.body.urlFoto,
                    precio: req.body.precio,
                    stock: req.body.stock
                });
    
                res.redirect('/')
                
            }else{
                loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada - Ruta no autorizada`)
                res.render('error-notif', {errorMsg: {error: '-1', descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`}});
            }
        }catch(error){
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`);
        }
    },

    productosPUT: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            if(administrador){
                res.render('error-notif', await productos.updateById(req.params.id, req.query));
            }else{
                loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada - Ruta no autorizada`)
                res.send({errorMsg: {error: '-1', descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`}});
            }
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    productosDELETE: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            if(administrador){
                res.render('error-notif', await productos.deleteById(req.params.id) )
            } else {
                loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada - Ruta no autorizada`)
                res.send({errorMsg: {error: '-1', descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`}})
            }
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }
}

export { controllerProductos }