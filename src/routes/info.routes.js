import express from 'express';
import controllerInfo from '../controllers/info.controller.js';
const info = express.Router()

info.get('/', controllerInfo.infoGET);

export default info