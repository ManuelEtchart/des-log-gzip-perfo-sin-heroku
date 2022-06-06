import axios from "axios";

let listaProductos = await axios.get('http://localhost:8080/api/productos')
console.log('lista productos----------------------------------------------------------------', listaProductos.data)

let response = await axios.post('http://localhost:8080/api/productos',{
    timestamp: Date.now(),
    nombre: 'remera ',
    descripcion: 'remera blanca',
    codigo: 'hdgd6',
    foto: 'remera.jpg',
    precio: 500,
    stock: 10
})


let listaProductoAgregado = await axios.get('http://localhost:8080/api/productos')
console.log('listaProductoAgregado', listaProductoAgregado.data)

await axios.put(`http://localhost:8080/api/productos/629dedff8a6b5a020d2e9832?precio=2222`)

let listaProductoModificado = await axios.get('http://localhost:8080/api/productos')
console.log('listaProductoModificado-----------------------------------------------', listaProductoModificado.data)

await axios.delete(`http://localhost:8080/api/productos/629dee26e722958dfc9d0903`)

let listaProductoEliminado = await axios.get('http://localhost:8080/api/productos')
console.log('listaProductoEliminado-------------------------------------------------', listaProductoEliminado.data)
