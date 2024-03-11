const express = require("express")
const menuRouter = express.Router()
const Menu = require("../models/Menu")
const authMiddleware = require("../authMiddleware")

menuRouter.get("/", authMiddleware, async (req, res) => {
        const menu = await Menu.find()
        console.log(menu)
        if(menu.length === 0){
           console.log("il n'existe aucun menu")
           res.status(404).send('il nexiste aucun menu'); 
        }else{
        res.send(menu[0])
      }
})


module.exports = menuRouter