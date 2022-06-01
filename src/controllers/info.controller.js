import { loggerError, logger } from "../utils/logger.js";
import minimist from "minimist";
import { cpus } from 'os';
import ContenedorMemoria from "../DAOs/DAOMemoria.js";
import MensajesDaoMongoDB from "../DAOs/mensajesDaoMongoDB.js";

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

const controllerInfo = {
    infoGET: async (req,res)=>{
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            res.render('info', {
                datos:{
                    cpus: cpus.length,
                    argsEnt: process.argv.slice(2),
                    nomPlat: process.platform,
                    verNode: process.version,
                    memToRev: JSON.stringify(process.memoryUsage().rss),
                    pathExe: process.execPath,
                    procId: process.pid,
                    carProy: process.cwd()
                },
                mensajes: await mensajes.getAll()
            })
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }
}

export default controllerInfo


    