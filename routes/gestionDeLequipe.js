const express = require("express")
const mongoose = require("mongoose")
const stuffRouter = express.Router()
const Stuff = require("../models/Stuff")
const SignIn = require("../models/SignIn")
const bcrypt = require("bcrypt")
const authMiddleware = require("../authMiddleware")

// afficher tous le stuff
stuffRouter.get("/", authMiddleware, async (req, res) => {
    const stuffs = await Stuff.find().sort({_id : -1})
    if(stuffs.length === 0){
       console.log("il n'existe aucun stuff")
       res.status(404).send("il n'existe aucun stuff"); 
    }else{
    res.send(stuffs)
    }
})

// formulaire d'ajout
stuffRouter.post("/ajouter", authMiddleware, async (req, res) => {
    const { nom, prenom, e_mail, role, password } = req.body;
    // pour crypter le password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
     const stuff = new Stuff({
        nom : nom,
        prenom : prenom,
        e_mail : e_mail,
        role : role
     })
     await stuff.save();
     const signIn = new SignIn({
        e_mail : e_mail,
        password : hashedPassword,
        role : role,
        idEnfant : stuff._id
     })
     try{
        await signIn.save()
        .then(res.status(201).json({"message":"success"}))
        .then(console.log("stuff enregistré"))
        }catch{
       console.log("Erreur lors de l'ajout d'un suff à la base de données")
       res.status(500).send("Erreur lors de l'ajout d'un suff à la base de données");
     }

})

// suppression
stuffRouter.post("/supprimer", authMiddleware, async (req, res) => {
    try {
      await Stuff.deleteOne({_id : req.body.employeeId})
      await SignIn.deleteOne({idEnfant : req.body.employeeId})
      .then(console.log("stuff supprimé"))
      .then(res.status(201).json({"message":"success"}))
    }catch{
        console.log("erreur lors de la suppression du stuff")
        res.status(500).send("erreur lors de la suppression du stuff");
    }
})


module.exports = stuffRouter