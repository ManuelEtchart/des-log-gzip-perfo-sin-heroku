import minimist from 'minimist';
import {faker} from '@faker-js/faker';
import { loggerError, logger } from "../utils/logger.js";
import MensajesDaoMongoDB from '../DAOs/mensajesDaoMongoDB.js';
import ContenedorMemoria from '../DAOs/DAOMemoria.js';

let options = {alias: {p: 'persistencia'}}
let args = minimist(process.argv, options)

let mensajes = null;

switch (args.persistencia) {
    case 'mongoDB':
        mensajes = new MensajesDaoMongoDB()
        break;
    case 'memoria':
        mensajes = new ContenedorMemoria()
        break
    default:
        break;
}

const controllerMensajes = {
    mensajesPOST: async (req,res) =>{
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
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
            await mensajes.save(mensaje)
            res.redirect(req.headers.referer)
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }
}

export { controllerMensajes };