import express from 'express';
import { mensajesPOST } from '../controllers/mensajes.controller.js';
import { logger, loggerError } from '../utils/logger.js';

const mensajes = express.Router();

mensajes.use(express.json());
mensajes.use(express.urlencoded({extended: true}));

mensajes.post('', async (req,res) =>{
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        res.redirect(await mensajesPOST(req))
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
});

export default mensajes