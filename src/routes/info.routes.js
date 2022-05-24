import express from 'express';
import { infoGET } from '../controllers/info.controller.js';
import { logger, loggerError } from '../utils/logger.js';

const info = express.Router()

info.get('/', async (req,res)=>{
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        res.render('info', await infoGET(req))
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
    
});

export default info