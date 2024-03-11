const express = require("express");
const avisRouter = express.Router();
const Avis = require("../models/Avis")
const mongoose = require("mongoose")
const authMiddleware = require("../authMiddleware")


// afficher les avis dans l'accueil
avisRouter.get("/", authMiddleware, async(req, res) => {
    const avis = await Avis.find().sort({_id : -1})
        if(avis.length === 0){
            console.log("il n'existe aucun avis")
            res.status(404).send("il n'existe aucun avis")
        }else{
        res.status(201).send(avis)
        }
})

// ajouter un avis 
avisRouter.post("/", authMiddleware, async(req, res) => {
    try{
    const {nom, nomEnfant, avis} = req.body;
    const nvAvis = new Avis({
        nom : nom,
        nomEnfant : nomEnfant,
        avis : avis
    })
    await nvAvis.save()
    .then(console.log("avis enregistré"))
    .then(res.status(201).json({message : "success"}))
    }catch{
       console.log("erreur lors de l'enregistrement de l'avis")
       res.status(500).send("erreur lors de l'enregistrement de l'avis")
    }
})

module.exports = avisRouter;