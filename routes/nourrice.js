const express = require("express");
const nourriceRouter = express.Router();
const Comment = require("../models/NourriceComment")
const Enfants = require("../models/Enfants")
const Matiere = require("../models/Matieres")
const Semaine = require("../models/Semaine")
const Competences = require("../models/Competences");
const authMiddleware = require("../authMiddleware");

// afficher tous les enfants
nourriceRouter.get("/", authMiddleware, async (req, res) => {
    const enfants = await Enfants.find().sort({_id : -1})
    if(enfants.length === 0){
       console.log("il n'existe aucun enfant")
       res.status(404).send('il nexiste aucun enfant'); 
    }else{
    res.send(enfants)
    }
})

// afficher tous les commentaires
nourriceRouter.get("/commentaires", authMiddleware, async (req, res) => {
    const  commentaires = await Comment.find().sort({_id : -1})
    if(commentaires.length === 0){
       console.log("il n'existe aucun commentaire")
       res.status(404).send('il nexiste aucun commentaire'); 
    }else{
    res.send(commentaires)
    }
})

// afficher tous les matières 
nourriceRouter.get("/matieres", authMiddleware, async (req, res) => {
    const matieres = await Matiere.find().sort({_id : -1})
    if(matieres.length === 0){
       console.log("il n'existe aucune matiere")
       res.status(404).send('il nexiste aucune matiere'); 
    }else{
    res.send(matieres)
    }
})

// ajouter une nouvelle matiere
nourriceRouter.post("/matieres", authMiddleware, async(req, res) => {
    try {
    const matiere = new Matiere({
        nom : req.body.nom,
        couleure : req.body.couleure,
        activites : req.body.activites
    })
    console.log(matiere)
        await matiere.save()
        .then(console.log("matiere enregistré"))
        .then(res.status(201).json({message : "sucess"}))
    }catch{
        console.log("erreur lors de l'ajout de la matiere")
        res.status(500).send("erreur lors de l'ajout de la matiere")
    }
})

// ajouter une nouvelle activite
nourriceRouter.post("/matieres/:id", authMiddleware, async(req, res) => {
    try {
        const matiere = await Matiere.findById(req.params.id)
        await matiere.activites.push(req.body.activite)
        await matiere.updateOne({$inc: { nbr_activites : 1 }})
        await matiere.save()
        console.log(matiere)
        console.log("activite enregistré")
        res.status(201).json({message : "sucess"})
    }catch{
        console.log("erreur lors de l'ajout de l'activite")
        res.status(500).send("erreur lors de l'ajout de l'activite")
    }
})

//ajouter un commentaire à un enfant
nourriceRouter.get("/:id/comment", authMiddleware, async(req, res) => {
    try{
        const enfant = await Enfants.findById(req.params.id)
        res.send(enfant)
    }catch{
        res.status(500).send("erreur lors de l'affichage des infos pour commenter cet enfant")
        console.log("erreur lors de l'affichage des infos pour commenter cet enfant")
    }
})

nourriceRouter.post("/:id/comment", authMiddleware, async(req, res) => {
    try {
    const enfant = await Enfants.findById(req.params.id)
    const comment = new Comment({
        idEnfant : enfant._id,
        comment : req.body.comment,
        nomEnfant : enfant.childName
    })
        await comment.save()
        .then(console.log("commentaire enregistré"))
        .then(res.status(201).json({message : "sucess"}))
    }catch{
        console.log("erreur lors de l'ajout du commentaire")
        res.status(500).send("erreur lors de l'ajout du commentaire")
    }   
})

//ajouter un comportement à un enfant
nourriceRouter.get("/:id/comportement", authMiddleware, async(req, res) => {
    try{
        const enfant = await Enfants.findById(req.params.id)
        res.send(enfant)
    }catch{
        res.status(500).send("erreur lors de l'affichage des infos pour commenter cet enfant")
        console.log("erreur lors de l'affichage des infos pour commenter cet enfant")
    }
})

nourriceRouter.post("/:id/comportement", authMiddleware, async(req, res) => {
    try {
        //section 1
        if(req.body.comportement){
        const semaine = await Semaine.findOne({idEnfant : req.params.id})
        if(!semaine){
            semain = new Semaine({
                comportement : req.body.comportement,
                absences : req.body.absences,
                idEnfant : req.params.id
            })
            await semain.save()
        }else{
        semaine.comportement = req.body.comportement
        semaine.absences = req.body.absences
        await semaine.save()
        }
    }
    //section 2
        const competences = await Competences.findOne({idEnfant : req.params.id, matiere : req.body.matiere, activite : req.body.activite})
        if(!competences){
            competence = new Competences({
                matiere : req.body.matiere,
                idEnfant : req.params.id,
                activite : req.body.activite,
                niveau : req.body.niveau
            })
            await competence.save()
        }else{
            competences.niveau = req.body.niveau
            await competences.save()
        }
    //le comment
    if(req.body.comment){
        const enfant = await Enfants.findById(req.params.id)
        const comment = new Comment({
        idEnfant : enfant._id,
        comment : req.body.comment,
        nomEnfant : enfant.childName
    })
        await comment.save()
    }
    //le finally   
        console.log("comportement enregistré")
        res.status(201).json({message : "sucess"})

    }catch{
        console.log("erreur lors de l'ajout du comportement")
        res.status(500).send("erreur lors de l'ajout du comportement")
    }   
})



module.exports = nourriceRouter;