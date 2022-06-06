import supertest from "supertest";
import { expect } from "chai";

let request;

describe('pruebas api productos', function () {
    before(async function(){
        console.log('----------------Comienzo TOTAL test------------------')
        await connectDB()
        request = supertest('http://localhost:8080/api/productos')
    })

    after(function(){
        console.log('----------------Fin TOTAL test-------------------')
    })

    it('productos GET', async () => {

    })

    it('productos POST', async () => {
        
    })

    it('productos PUT', async () => {
        
    })

    it('productos DELETE', async () => {
        
    })
})