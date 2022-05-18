import ProductosDaoMongoDB from "../DAOs/productosDaoMongoDB.js";
import { loggerError } from "../utils/logger.js";
import { mensajesMonDB } from "./mensajes.controller.js";

export const productosMongoDB = new ProductosDaoMongoDB();

const administrador = true;

async function productosFormGET(req){
    try {
        return {mensajes: await mensajesMonDB.getAll()}
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
}

async function productosGET(req){
    try {
        if (req.params.id === undefined) {
            return {view: 'inicio', vars: {productos: await productosMongoDB.getAll(), mensajes: await mensajesMonDB.getAll()}}
        }else{
            return {view: 'producto', vars: {producto: await productosMongoDB.getById(req.params.id), mensajes: await mensajesMonDB.getAll()}}
        } 
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
}

async function productosPOST(req){
    try {
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

            return '/'
            
        }else{
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada - Ruta no autorizada`)
            return {errorMsg: {error: '-1', descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`}};
        }
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
}

async function productosPUT(req){
    try {
        if(administrador){
            return await productosMongoDB.updateById(req.params.id, req.query);
        }else{
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada - Ruta no autorizada`)
            return {errorMsg: {error: '-1', descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`}};
        }
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
}

async function productosDELETE(){
    try {
        if(administrador){
            return await productosMongoDB.deleteById(req.params.id)
        }else{
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada - Ruta no autorizada`)
            return {errorMsg: {error: '-1', descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`}};
        }
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
}

export { productosFormGET, productosGET, productosPOST, productosPUT, productosDELETE}