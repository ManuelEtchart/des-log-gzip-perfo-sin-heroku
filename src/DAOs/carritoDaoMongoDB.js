import ContenedorMongoDB from "../contenedores/contenedorMongoDB.js";
import carritosModel from "../models/carritos.model.js";

class CarritoDaoMongoDB extends ContenedorMongoDB{
    constructor(){
        super(carritosModel)
    }
}

export default CarritoDaoMongoDB; 