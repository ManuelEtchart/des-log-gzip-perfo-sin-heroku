import mongoose from "mongoose";
import supertest from "supertest";
import { expect } from "chai";
import config from "./src/utils/config.js";
import { app } from "./server.js";

let request;
let server;

describe('pruebas api productos', function () {

    before(async function(){
        console.log('----------------Comienzo TOTAL test------------------')
        await connectDB()
        server = await startServer()
        request = supertest(`http://localhost:${server.address().port}/api/productos`)
        
    })

    after(function(){
        mongoose.disconnect()
        server.close()
        console.log('----------------Fin TOTAL test-------------------')
    })
    
    describe('productos GET', () => {
        it('productos GET', async () => {
            const response = await request.get('/')
            expect(response.status).to.eql(200)
        })
    })
    
    describe('productos POST', () => {
        it('productos POST', async () => {
            const producto = {
                timestamp: Date.now(),
                nombre: 'gorra',
                descripcion: 'gorra roja',
                codigo: 'j7h98k',
                foto: 'gorra.jpg',
                precio: 256,
                stock: 10
            }
    
            const response = await request.post('/').send(producto)
            
            expect(response.status).to.eql(302)
    
            const prod = response.request._data
            expect(prod).to.include.keys('timestamp', 'nombre', 'descripcion', 'codigo', 'foto', 'precio', 'stock')
            expect(prod.timestamp).to.eql(producto.timestamp)
            expect(prod.nombre).to.eql(producto.nombre)
            expect(prod.descripcion).to.eql(producto.descripcion)
            expect(prod.codigo).to.eql(producto.codigo)
            expect(prod.foto).to.eql(producto.foto)
            expect(prod.precio).to.eql(producto.precio)
            expect(prod.stock).to.eql(producto.stock)
        })
    })
    
    describe('productos PUT', () => {
        it('productos PUT', async () => {
            const response = await request.put('/629dedff8a6b5a020d2e9832?precio=333')
    
            const producto = await request.get('/629dedff8a6b5a020d2e9832')
            console.log(producto.request._data)
            expect(response.status).to.eql(200)
            expect(prod.precio).to.eql(333)
        })
    })

    it('productos DELETE', async () => {
        const response = await request.delete('/629dedff8a6b5a020d2e9832')

        const producto = await request.get('/629dedff8a6b5a020d2e9832')
        const prod = producto.request._data

        expect(response.status).to.eql(200)
        expect(prod).to.eql(undefined)
    })
})

async function connectDB(){
    try {
        await mongoose.connect(config.mongoDB.url)
    } catch (error) {
        console.log(error, "Hubo un error")
    } 
}

async function startServer() {
    return new Promise((resolve, reject) => {
        const PORT = 0
        const server = app.listen(PORT, () => {
            console.log(`Servidor express escuchando en el puerto ${server.address().port}`);
            resolve(server)
        });
        server.on('error', error => {
            console.log(`Error en Servidor: ${error}`)
            reject(error)
        });
    })
}
