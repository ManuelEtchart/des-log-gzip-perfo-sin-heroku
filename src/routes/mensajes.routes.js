import express from 'express';
import { controllerMensajes } from '../controllers/mensajes.controller.js';

const mensajes = express.Router();

mensajes.use(express.json());
mensajes.use(express.urlencoded({extended: true}));

mensajes.post('', controllerMensajes.mensajesPOST);

export default mensajes