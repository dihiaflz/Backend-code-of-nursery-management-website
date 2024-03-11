const express = require("express");
const parentRouter = express.Router();
const mongoose = require("mongoose")
const Enfant = require("../models/Enfants")
const Parent = require("../models/Parents")
const OrthoComment = require("../models/OrthoComment")
const NourriceComment = require("../models/NourriceComment")
const PsychoComment = require("../models/PsychoComment")
const Semaine = require("../models/Semaine")
const Competences = require("../models/Competences")
const authMiddleware = require("../authMiddleware")

//afficher la messagerie
parentRouter.get("/:id/comments", authMiddleware, async (req, res) => {
    try {
        const orthoComment = await OrthoComment.find({idEnfant : req.params.id}).sort({date : -1})
        const nourriceComment = await NourriceComment.find({idEnfant : req.params.id}).sort({date : -1})
        const psychoComment = await PsychoComment.find({idEnfant : req.params.id}).sort({date : -1})
        if(orthoComment.length === 0 && nourriceComment.length === 0 && psychoComment.length === 0){
            console.log("il n'existe aucun commentaire")
            res.status(404).send('il nexiste aucun commentaire'); 
        }else{
        const comments = [orthoComment, nourriceComment, psychoComment]
        const allComments = comments.flat()
        allComments.sort((a, b) => b.date - a.date)
        res.send(allComments);
        }
    } catch (err) {
        console.log("erreur lors de l'affichage de la messagerie de l'enfant");
        res.status(404).send("erreur lors de l'affichage de la messagerie de l'enfant");
    }
});


//affichage des informations de l'enfant
parentRouter.get("/:id/infos", authMiddleware, async (req, res) => {
    try {
        const enfant = await Enfant.findById(req.params.id)
        const parent = await Parent.findById(enfant.informations.info_personnelles.parents);
        res.send([enfant, parent]);
    } catch (err) {
        console.log("erreur lors de l'affichage des informations de l'enfant");
        res.status(500).send("erreur lors de l'affichage des informations de l'enfant");
    }
});

//afficher le comportement de l'enfant
parentRouter.get("/:id/cetteSemaine", authMiddleware, async (req, res) => {
    try {
        const semaine = await Semaine.find({idEnfant : req.params.id})
        if(semaine.length === 0){
            console.log("comportement de l'enfant n'existe pas");
            res.status(404).send("comportement de l'enfant n'existe pas");
        }else {
        res.send(semaine);
        }
    } catch (err) {
        console.log("erreur lors de l'affichage du comportement de l'enfant");
        res.status(500).send("erreur lors de l'affichage du comportement de l'enfant");
    }
});

//afficher le niveau des activités de l'enfant
parentRouter.get("/:id/competences", authMiddleware, async (req, res) => {
    try {
        const competences = await Competences.find({idEnfant : req.params.id}).sort({_id : -1})
        if(competences.length === 0){
            console.log("competences de l'enfant n'existe pas");
            res.status(404).send("competences de l'enfant n'existe pas");
        }else {
        res.send(competences);
        }
    } catch (err) {
        console.log("erreur lors de l'affichage des competences de l'enfant");
        res.status(500).send("erreur lors de l'affichage des competences de l'enfant");
    }
});

module.exports = parentRouter;