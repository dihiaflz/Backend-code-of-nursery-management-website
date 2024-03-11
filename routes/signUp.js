const express = require("express")
const signUpRouter = express.Router()
const SignUp = require("../models/SignUp")
const _ = require('lodash');
const bcrypt = require("bcrypt")

const signUp = new SignUp();
signUpRouter.post("/etape1", async(req, res) => {
    try{
      signUp.childName = req.body.childName
      signUp.age = req.body.age,
      _.set(signUp, 'informations.info_personnelles.dateDeNaissance', req.body.date)
      _.set(signUp, 'informations.info_personnelles.sexe', req.body.sexe)
      _.set(signUp, 'informations.info_personnelles.parents.pere.nom', req.body.nomPere)
      _.set(signUp, 'informations.info_personnelles.parents.pere.profession', req.body.professionPere)
      _.set(signUp, 'informations.info_personnelles.parents.mere.nom', req.body.nomMere)
      _.set(signUp, 'informations.info_personnelles.parents.mere.profession', req.body.professionMere)
      console.log("phase 1 enregistré")
      res.status(201).json({"message":"success"})
    }catch{
        console.log("erreur lors de l'ajout de la phase 1")
        res.status(500).send("Erreur lors de l'ajout de la phase 1");
      }
})

signUpRouter.post("/etape2", async(req, res) => {
    try{
      signUp.e_mail = req.body.e_mail
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      signUp.password = hashedPassword
      _.set(signUp, 'informations.info_personnelles.parents.num_tel', req.body.num_tel)
      console.log("phase 2 enregistré")
      res.status(201).json({"message":"success"})
    }catch{
        console.log("erreur lors de l'ajout de la phase 2")
        res.status(500).send("Erreur lors de l'ajout de la phase 2");
      }
})

signUpRouter.post("/etape3", async(req, res) => {
    try {
      console.log(signUp)
      await signUp.save()
      console.log("phase 3 enregistré")
      res.status(201).json({"message":"success"})
    }catch{
      console.log("erreur lors de l'ajout de la phase 3")
      res.status(500).send("Erreur lors de l'ajout de la phase 3 à la base de données");
    }
})


module.exports = signUpRouter;