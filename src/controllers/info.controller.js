import { loggerError, logger } from "../utils/logger.js";
import { mensajesMonDB } from "./mensajes.controller.js";
import { cpus } from 'os';

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
                mensajes: await mensajesMonDB.getAll()
            })
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }
}

export default controllerInfo


    