const express = require("express")
const routerContact = express.Router()
const ContactUs = require("../models/ContactUs")
const authMiddleware = require("../authMiddleware")


routerContact.post("/", authMiddleware, async (req, res) => {
    const contact = new ContactUs({
      nom : req.body.nom,
      e_mail : req.body.e_mail,
      message : req.body.message
    } )
    try{
      await contact.save()
      .then(console.log("message ajouté"))
      .then(res.status(201).json({"message":"sucess"}))
    }catch{
      console.log("erreur")
      res.status(500).send("Erreur lors de l'ajout d'un élément à la base de données");
    }
    })

module.exports = routerContact;