import express from 'express';
import ControllerMensajes from '../controllers/mensajes.controller.js';

const mensajes = express.Router();

mensajes.use(express.json());
mensajes.use(express.urlencoded({extended: true}));

class MensajesRouter{
    constructor(){
        this.controller = new ControllerMensajes()
    }

    start(){
        mensajes.post('', this.controller.mensajesPOST);

        return mensajes
    }
}



export default MensajesRouter;