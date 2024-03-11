const express = require("express")
const mongoose = require("mongoose")
const enfantRouter = express.Router()
const Enfants = require("../models/Enfants")
const Parents = require("../models/Parents")
const authMiddleware = require("../authMiddleware")

// afficher tous les enfants
enfantRouter.get("/", authMiddleware, async (req, res) => {
    const enfants = await Enfants.find().sort({_id : -1})
    if(enfants.length === 0){
       console.log("il n'existe aucun enfant")
       res.status(404).send('il nexiste aucun enfant'); 
    }else{
    res.send(enfants)
    }
})

// suppression
enfantRouter.post("/supprimer", authMiddleware, async (req, res) => { // j'ai utilisé le post pour le delete
    try {
        const enfant = await Enfants.findById(req.body.itemId)
        await Parents.findByIdAndDelete(enfant.informations.info_personnelles.parents)
        await Enfants.findByIdAndDelete(req.body.itemId)
        await SignIn.findByIdAndDelete(req.body.itemId)
        .then(res.status(201).json({"message":"sucess"}))
        .then(console.log("enfant supprimé"))
    }catch{
        console.log("erreur lors de la suppression de l'enfant")
        res.status(500).send("Erreur lors de la suppression de l'enafnt de la base de données");
    }
})

// afficher les informations de l'enfants
enfantRouter.get("/:id", authMiddleware, async (req, res) => {
    console.log("starting info")
    try {
        const enfant = await Enfants.findById(req.params.id)
        const parent = await Parents.findById(enfant.informations.info_personnelles.parents);
        res.send([enfant, parent]);
    } catch (err) {
        console.log("erreur lors de l'affichage des informations de l'enfant");
        res.status(500).send("erreur lors de l'affichage des informations de l'enfant");
    }
});



module.exports = enfantRouter
