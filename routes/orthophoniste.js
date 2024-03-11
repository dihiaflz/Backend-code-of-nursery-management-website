const express = require("express");
const orthoRouter = express.Router();
const Comment = require("../models/OrthoComment")
const Enfants = require("../models/Enfants");
const authMiddleware = require("../authMiddleware");

// afficher tous les enfants
orthoRouter.get("/", authMiddleware, async (req, res) => {
    const enfants = await Enfants.find().sort({_id : -1})
    if(enfants.length === 0){
       console.log("il n'existe aucun enfant")
       res.status(404).send('il nexiste aucun enfant'); 
    }else{
    res.send(enfants)
    }
})

// afficher tous les commentaires
orthoRouter.get("/commentaires", authMiddleware, async (req, res) => {
    const  commentaires = await Comment.find().sort({_id : -1})
    if(commentaires.length === 0){
       console.log("il n'existe aucun commentaire")
       res.status(404).send('il nexiste aucun commentaire'); 
    }else{
    res.send(commentaires)
    }
})

//ajouter un commentaire à un enfant
orthoRouter.get("/:id", authMiddleware, async(req, res) => {
    try{
        const enfant = await Enfants.findById(req.params.id)
        res.send(enfant)
    }catch{
        res.status(500).send("erreur lors de l'affichage des infos pour commenter cet enfant")
        console.log("erreur lors de l'affichage des infos pour commenter cet enfant")
    }
})

orthoRouter.post("/:id", authMiddleware, async(req, res) => {
    try {
    const enfant = await Enfants.findById(req.params.id)
    const comment = new Comment({
        idEnfant : enfant._id,
        comment : req.body.comment,
        nomEnfant : enfant.childName
    })
        await comment.save()
        console.log("commentaire enregistré")
        res.status(201).json({message : "sucess"})
    }catch{
        console.log("erreur lors de l'ajout du commentaire")
        res.status(500).send("erreur lors de l'ajout du commentaire")
    }
})


module.exports = orthoRouter;