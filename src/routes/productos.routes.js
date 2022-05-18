import express from 'express';
import { productosDELETE, productosFormGET, productosGET, productosPOST, productosPUT } from '../controllers/productos.controller.js';
import { logger, loggerError } from '../utils/logger.js';

const productos = express.Router();

productos.use(express.json());
productos.use(express.urlencoded({extended: true}));


productos.get('/form', async (req,res)=>{
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        res.render('productosForm', await productosFormGET(req));
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
});

productos.get('/:id?', async (req,res) => {
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        const resp = await productosGET(req)
        res.render(resp.view, resp.vars)
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
});

productos.post('', async (req,res) => {
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try{
        const resp = await productosPOST(req)
        if(resp === '/'){
            res.redirect(resp)
        }else{
            res.render('error-notif', resp)
        }
    }catch(error){
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`);
    }
});

productos.put('/:id', async (req,res) => {
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        const resp = await productosPUT(req)
        if (resp.errorMsg) {
            res.render('error-notif', resp )
        } else {
            res.send(resp)
        }
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
})

productos.delete('/:id', async (req,res) => {
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    try {
        const resp = await productosDELETE(req)
        if (resp.errorMsg) {
            res.render('error-notif', resp )
        } else {
            res.send(resp)
        }
    } catch (error) {
        loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
    }
})

export default productos