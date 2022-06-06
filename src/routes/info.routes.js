import express from 'express';
import ControllerInfo from '../controllers/info.controller.js';
const info = express.Router()

class InfoRouter{
    constructor(){
        this.controller = new ControllerInfo()
    }

    start(){
        info.get('/', this.controller.infoGET);
        
        return info
    }
}



export default InfoRouter;