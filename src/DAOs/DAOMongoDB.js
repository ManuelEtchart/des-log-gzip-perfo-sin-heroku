import MongoDBClient from "../classes/MongoDBClient.class.js";
import productosModel from "../models/productos.model.js";
import DAO from "./DAO.class.js";

class DAOMongoDB extends DAO{
    constructor(model){
        super();
        this.coleccion = model;
        this.conn = new MongoDBClient();
    }

    async save(obj){
        try {
            await this.conn.connect()
            await this.coleccion.insertMany([obj])
            return {'Objeto agregado': obj}
        } catch(error){
            console.log(error, "Hubo un error");
        }finally{
            this.conn.disconnect().catch((error)=>{
                console.log(error, "Hubo un error");
            });
        }
    };

    async getById(id){
        try {
            await this.conn.connect()
            if(!this.conn.client.isObjectIdOrHexString(id)) {
                return {error: `Objeto ${id} no encontrado`}
            }
            const docs = await this.coleccion.find({"_id": id}).lean()
            if(docs.length === 0){
                return {error: `Objeto ${id} no encontrado`}
            }else{
                return docs
            }
        } catch(error){
            console.log(error, "Hubo un error");
        }finally{
            this.conn.disconnect().catch((error)=>{
                console.log(error, "Hubo un error");
            });
        }
    }

    async getAll(){
        try {
            await this.conn.connect()
            console.log(this.coleccion)
            const docs = await this.coleccion.find({}).lean()
            if(docs.length === 0){
                return {'msg': 'No hay objetos agregados'}
            }else{
                return docs
            }
        } catch (error) {
            console.log(error, "Hubo un error");
        }
        finally{
            this.conn.disconnect().catch((error)=>{
                console.log(error, "Hubo un error");
            });
        }
    };

    async updateById(id, cambios){
        try {
            await this.conn.connect()
            if(!this.conn.client.isObjectIdOrHexString(id)) {
                return {error: `Objeto ${id} no encontrado`}
            }
            await this.coleccion.updateOne({_id : id},{$set: cambios})
            return {msg: `Objeto ${id} modificado`}
        } catch (error) {
            console.log(error, "Hubo un error");
        }
        finally{
            this.conn.disconnect().catch((error)=>{
                console.log(error, "Hubo un error");
            });
        }
    };

    async deleteById(id){
        try {
            await this.conn.connect()
            if(!this.conn.client.isObjectIdOrHexString(id)) {
                return {error: `Objeto ${id} no encontrado`}
            }
            await this.coleccion.deleteOne({_id : id})
            return {msg: `Objeto ${id} eliminado`}
        } catch (error) {
            console.log(error, "Hubo un error");
        }
        finally{
            this.conn.disconnect().catch((error)=>{
                console.log(error, "Hubo un error");
            });
        }
    };

    async deleteAll(){
        try {
            await this.conn.connect()
            await this.coleccion.deleteMany({})
            return {'msg': 'Todos los objetos han sido eliminados'}
        } catch (error) {
            console.log(error, "Hubo un error");
        }
        finally{
            this.conn.disconnect().catch((error)=>{
                console.log(error, "Hubo un error");
            });
        }
    };

    async agregarProductoEnCarrito(id, id_prod){
        try {
            await this.conn.connect();

            if(!this.conn.client.isObjectIdOrHexString(id)) {
                return {error: `Objeto ${id} no encontrado`}
            };
            if(!this.conn.client.isObjectIdOrHexString(id_prod)) {
                return {error: `Objeto ${id_prod} no encontrado`}
            };
            
            const productoBuscadoArray = await productosModel.find({"_id": id_prod}).lean()
            const productoBuscadoObj = productoBuscadoArray[0]

            if(productoBuscadoObj.nombre === undefined){
                return {error: `Producto ${id_prod} no encontrado`}
            }

            await this.conn.connect()
            await this.coleccion.updateOne({_id: id},{$push:{productos: productoBuscadoObj}})
            
            return  {msg: `Producto ${id_prod} agregado`}
        } catch (error) {
            console.log(error, "Hubo un error");
        }
        finally{
            this.conn.disconnect().catch((error)=>{
                console.log(error, "Hubo un error");
            });
        }
        
    }

    async borrarProductoEnCarrito(id, id_prod){
        try {
            await this.conn.connect();

            if(!this.conn.client.isObjectIdOrHexString(id)) {
                return {error: `Objeto ${id} no encontrado`}
            };
            if(!this.conn.client.isObjectIdOrHexString(id_prod)) {
                return {error: `Objeto ${id_prod} no encontrado`}
            };
            
            const productoBuscadoArray = await productosModel.find({"_id": id_prod}).lean();
            const productoBuscadoObj = productoBuscadoArray[0];

            await this.conn.connect()
            await this.coleccion.updateOne({_id: id},{$pull:{productos: productoBuscadoObj}})
            
            return {msg: `Producto ${id_prod} eliminado`}
        } catch (error) {
            console.log(error, "Hubo un error");
        }finally{
            this.conn.disconnect().catch((error)=>{
                console.log(error, "Hubo un error");
            });
        }
    }
}

export default DAOMongoDB;