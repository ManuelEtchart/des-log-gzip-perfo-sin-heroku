import ContenedorMongoDB from "../contenedores/contenedorMongoDB.js";
import productosModel from "../models/productos.model.js";

class ProductosDaoMongoDB extends ContenedorMongoDB{
    constructor(){
        super(productosModel)
    }
}

export default ProductosDaoMongoDB; 