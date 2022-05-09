const express = require("express")
const path = require('path');
const API = require("./services/API.js")
const service = new API
const app = express()
const port = 3000
app.use(cors({
  origin: '*'
}));
app.listen(port, ()=>console.log("hola"))
app.get("/", async(req, res)=>{
    const entradas = await service.index()
    res.send(entradas)
})
app.get("/blog/:id",  async(req, res)=>{
    const { id }= req.params
    const entrada = await service.entrada(id)
    res.send(entrada)  
   })
   app.get("/categoria/:id",  async(req, res)=>{
        const { id }= req.params
        const entradas = await service.categoria(id)
    res.send(entradas)
   })
 