import mongoose from "mongoose";

const carritosSchema = mongoose.Schema({
    timestamp: {type: Date, require: true, default: Date.now()},
    productos: {type: Array, require: true}
});

const carritosModel = mongoose.model('carritos', carritosSchema);

export default carritosModel; 
