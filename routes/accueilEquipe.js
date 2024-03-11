const express = require("express")
const routerAccueil = express.Router()
const Stuff = require("../models/Stuff")
const authMiddleware = require("../authMiddleware")

// afficher toute l'équipe dans l'accueil
routerAccueil.get("/", authMiddleware,  async (req, res) => {
    const stuff = await Stuff.find().sort({_id : -1})
    if(stuff.length === 0){
       console.log("il n'existe aucun stuff")
       res.status(404).send('il nexiste aucun stuff'); 
    }else{
    res.send(stuff)
    }
})

module.exports = routerAccueil