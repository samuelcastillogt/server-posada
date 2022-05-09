var firebase = require("firebase/app")
require("firebase/firestore")
const firebaseConfig = {
  apiKey: "AIzaSyDSSeuU8iHnoN3ucTzTFhfn6GylKIqasL0",
  authDomain: "escuela-32bef.firebaseapp.com",
  databaseURL: "https://escuela-32bef.firebaseio.com",
  projectId: "escuela-32bef",
  storageBucket: "escuela-32bef.appspot.com",
  messagingSenderId: "913904034443",
  appId: "1:913904034443:web:822c99f3fdd229fddbea8e",
  measurementId: "G-K2VS202KHJ"
  }
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const blog = db.collection("blog")
class API  {
    async index(){
    const peticion =  await blog.get()
    const { docs } = peticion
    const entradas = docs.map(entrada =>({ entrada: entrada.id, titulo: entrada.data().titulo, imgDes: entrada.data().imgDes}))
    return entradas
    }
    async entrada(id){
    let data = await blog.doc(id).get()
    const  entrada  = data.data()
    let peticion = await blog.where("categoria", "==", entrada.categoria).get()
    const { docs } = peticion
     const entradas = docs.map(entrada =>({ datos: entrada.data()}))
    const resultado = {datos: entrada, relaciondas: entradas}
    return resultado
    }
    async categoria(id){
        const peticion =  await blog.where("categoria", "==", id).get()
        const { docs } = peticion
        const entradas = docs.map(entrada =>({ categoria: id, datos: entrada.data()}))
        return entradas
    }
}
module.exports= API