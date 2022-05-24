import CarritoDaoMongoDB from "../DAOs/carritoDaoMongoDB.js";
import { loggerError } from "../utils/logger.js";
import { mensajesMonDB } from "./mensajes.controller.js";
import { productosMongoDB } from "./productos.controller.js";

const carritoMongoDB = new CarritoDaoMongoDB();

async function carritosGET(req){
    try {
        return {carritos: await carritoMongoDB.getAll(), mensajes: await mensajesMonDB.getAll()}
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`);
    }
};

async function carritoPOST(req){
    try {
        await carritoMongoDB.save(
            {
                timestamp: Date.now(),
                productos: []
            }
        );
        return '/api/carrito'
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`);
    }
}

async function carritoDELETE(req){
    try {
        return await carritoMongoDB.deleteById(req.params.id)
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`);
    }
}

async function carritoGET(req){
    try {
        if(req.params.id === undefined){
            return {view: 'carritos', vars: {carritos: await carritoMongoDB.getAll(), mensajes: await mensajesMonDB.getAll()}}
        }else{
            return {view: 'carrito', vars: {carritos: await carritoMongoDB.getById(req.params.id), mensajes: await mensajesMonDB.getAll(), productos: await productosMongoDB.getAll()}}
        }
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`);
    }
}

async function carritoProductoPOST(req){
    try {
        await carritoMongoDB.agregarProductoEnCarrito(req.params.id, req.params.id_prod)
        return {carritos: await carritoMongoDB.getById(req.params.id), mensajes: await mensajesMonDB.getAll(), productos: await productosMongoDB.getAll()}
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`);
    }
}

async function carritoProductoDELETE(req){
    try {
        return await carritoMongoDB.borrarProductoEnCarrito(req.params.id,req.params.id_prod)
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`);
    }
}

export {carritosGET, carritoPOST, carritoDELETE, carritoGET, carritoProductoPOST, carritoProductoDELETE}