import ProductosDaoMongoDB from "../DAOs/productosDaoMongoDB.js";
import { loggerError, logger } from "../utils/logger.js";
import { mensajesMonDB } from "./mensajes.controller.js";

const productosMongoDB = new ProductosDaoMongoDB();

const administrador = true;

const controllerProductos = {
    productosFormGET: async (req,res)=>{
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            res.render('productosForm', {mensajes: await mensajesMonDB.getAll()});
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    productosGET: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            if (req.params.id === undefined) {
                res.render('inicio', {productos: await productosMongoDB.getAll(), mensajes: await mensajesMonDB.getAll()})
            }else{
                res.render('producto', {producto: await productosMongoDB.getById(req.params.id), mensajes: await mensajesMonDB.getAll()})
            } 
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    productosPOST: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try{
            if(administrador){
            
                await productosMongoDB.save({
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
                res.render('error-notif', await productosMongoDB.updateById(req.params.id, req.query));
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
                res.render('error-notif', await productosMongoDB.deleteById(req.params.id) )
            } else {
                loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada - Ruta no autorizada`)
                res.send({errorMsg: {error: '-1', descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`}})
            }
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }
}

export { controllerProductos, productosMongoDB }