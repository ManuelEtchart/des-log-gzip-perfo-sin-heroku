import DAOMemoria from "../DAOs/DAOMemoria.js";
import DAOMongoDB from "../DAOs/DAOMongoDB.js";
import productosModel from "../models/productos.model.js";
import mensajesModel from "../models/mensajes.model.js";
import carritosModel from "../models/carritos.model.js"
import minimist from 'minimist';

let options = {alias: {p: 'persistencia'}}
let args = minimist(process.argv, options)

class DAOFactory {
    get() {
        switch (args.persistencia) {
            case 'memoria':
                return {productos: new DAOMemoria(), mensajes: new DAOMemoria(), carritos: new DAOMemoria()};
            case 'mongodb':
                return {productos: new DAOMongoDB(productosModel), mensajes: new DAOMongoDB(mensajesModel), carritos: new DAOMongoDB(carritosModel)};
            default:
                return {productos: new DAOMongoDB(productosModel), mensajes: new DAOMongoDB(mensajesModel), carritos: new DAOMongoDB(carritosModel)};
        }
    }
}

export default DAOFactory;