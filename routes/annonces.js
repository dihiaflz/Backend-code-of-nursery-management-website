const express = require("express")
const mongoose = require("mongoose")
const annoncesRouter = express.Router()
const Event = require("../models/Event")
const Recrutement = require("../models/Recrutement")
const authMiddleware = require("../authMiddleware")

// afficher tous les annonces
annoncesRouter.get("/annonces", authMiddleware, async (req, res) => {
    const ann = await Event.find().sort({_id : -1})
    if(ann.length === 0){
       console.log("il n'existe aucun event")
       res.status(404).send('il nexiste aucun event'); 
    }else{
    res.send(ann)
    }
})
// afficher tous les recrutements
annoncesRouter.get("/recrutements", authMiddleware,  async (req, res) => {
    const rec = await Recrutement.find().sort({_id : -1})
    if(rec.length === 0){
       console.log("il n'existe aucun recrutement")
       res.status(500).send('il nexiste aucun recrutement'); 
    }else{
    res.send(rec)
    }
})

module.exports = annoncesRouter