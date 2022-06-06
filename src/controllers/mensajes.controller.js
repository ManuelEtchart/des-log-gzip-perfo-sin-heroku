import {faker} from '@faker-js/faker';
import { loggerError, logger } from "../utils/logger.js";
import DAOFactory from '../classes/DAOFactory.class.js';

const DAO = (new DAOFactory()).get()

class ControllerMensajes {
    mensajesPOST = async (req,res) =>{
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
            await DAO.mensajes.save(mensaje)
            res.redirect(req.headers.referer)
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }
}

export default ControllerMensajes;