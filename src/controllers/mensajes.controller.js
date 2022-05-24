import MensajesDaoMongoDB from "../DAOs/mensajesDaoMongoDB.js";
import {faker} from '@faker-js/faker';
import { loggerError } from "../utils/logger.js";

const mensajesMonDB = new MensajesDaoMongoDB()

async function mensajesPOST(req){
    try {
        const mensaje = {
            email: req.body.email,
            nombre: req.body.nombreMensaje,
            apellido: req.body.apellido,
            edad: req.body.edad,
            alias: req.body.alias,
            mensaje: req.body.mensaje
        };
        let fechaActual = new Date();
        mensaje.fecha = `[(${fechaActual.getDay()}/${fechaActual.getMonth()}/${fechaActual.getFullYear()} ${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()})]`;
        mensaje.avatar = faker.image.avatar();
        await mensajesMonDB.save(mensaje);
        return req.headers.referer
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
}

export { mensajesPOST, mensajesMonDB };