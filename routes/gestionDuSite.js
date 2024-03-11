const express = require("express")
const mongoose = require("mongoose")
const siteRouter = express.Router()
const bcrypt = require("bcrypt")
const Menu = require("../models/Menu")
const Event = require("../models/Event")
const Recrutement = require("../models/Recrutement")
const SignUp = require("../models/SignUp")
const Enfants = require("../models/Enfants")
const Parents = require("../models/Parents")
const SignIn = require("../models/SignIn")
const ContactUs = require("../models/ContactUs")
const nodemailer = require("nodemailer")
const multer = require("multer")
const authMiddleware = require("../authMiddleware")
const upload = multer({ dest: 'public/uploads/' })
const _ = require('lodash')


// retourner les messages
siteRouter.get("/message", authMiddleware, async (req, res) =>{
  const contactUs = await ContactUs.find().sort({_id : -1}).select("-__v").lean()
  if(contactUs.length === 0){
    console.log("il n'existe aucun message")
    res.status(404).send("il n'existe aucun message"); 
  }else{
    res.send(contactUs)
  }
})

// supprimer le message
siteRouter.post("/message/supprimer", authMiddleware, async (req, res) => { 
  try{
  await ContactUs.findByIdAndDelete(req.body.id)
  console.log("message supprimé")
  res.status(201).json({"message":"success"})
  
  }catch (err) {
    console.log("erreur lors de la suppression du message");
    res.status(500).send("erreur lors de la suppression du message");
}
})

// repondre au message
siteRouter.post("/message/:id", authMiddleware, async (req, res) => { 
  try{
    const contactUs = await ContactUs.findById(req.params.id)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dihiadahdah@gmail.com',
        pass: 'deyexszhixwjwigq' 
      }
    });
    const mailOptions = {
      from: 'dihiadahdah@gmail.com',
      to: contactUs.e_mail,
      subject: `Réponse message envoyé à la crèche`,
      text: req.body.reponse
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur lors de l'envoi de la réponse");
      } else {
        console.log('E-mail envoyé: ' + info.response);
        res.send('Réponse envoyé avec succès');
      }
    })
    await ContactUs.findByIdAndDelete(req.params.id)
    res.status(201).json({"message":"success"})
    console.log("réponse envoyé")
  }catch (err) {
    console.log("erreur lors de la réponse au message");
    res.status(500).send("erreur lors de la réponse au message");
}
})

// retourner les demandes
siteRouter.get("/demande", authMiddleware, async (req, res) =>{
  const signUp = await SignUp.find().sort({_id : -1}).select("-__v").lean()
  if(signUp.length === 0){
    console.log("il n'existe aucune demande")
    res.status(404).send('il nexiste aucune demande'); 
  }else{
    res.send(signUp)
  }
})

// supprimer une demandes   
  siteRouter.post("/demande/supprimer", authMiddleware, async (req, res) => { 
      try {
        console.log("start")
        await SignUp.deleteOne({_id : req.body.demandeId})
        .then(res.status(201).json({"message":"success"}))
        .then(console.log("demande supprimé"))
      }catch{
          console.log("erreur lors de la suppression de la demande")
          res.status(500).send("Erreur lors de la suppression de la demande de la base de données");
      }
  })


// formulaires menu
siteRouter.post('/menu', authMiddleware, async(req, res) => {
          const { jour, repas01, repas02, repas03 } = req.body;
          try{
              const menu = await Menu.find()
              if(menu.length == 0) {
                const menu1 = new Menu()
                switch(jour){
                  case "Dimanche": 
                  _.set(menu1, 'dimanche.repas_01', repas01)
                  _.set(menu1, 'dimanche.repas_02', repas02)
                  _.set(menu1, 'dimanche.repas_03', repas03)
                  await menu1.save()
                  break;
                  case "Lundi": 
                  _.set(menu1, 'lundi.repas_01', repas01)
                  _.set(menu1, 'lundi.repas_02', repas02)
                  _.set(menu1, 'lundi.repas_03', repas03)
                  await menu1.save()
                  break;
                  case "Mardi": 
                  _.set(menu1, 'mardi.repas_01', repas01)
                  _.set(menu1, 'mardi.repas_02', repas02)
                  _.set(menu1, 'mardi.repas_03', repas03)
                  await menu1.save()
                  break;
                  case "Mercredi": 
                  _.set(menu1, 'mercredi.repas_01', repas01)
                  _.set(menu1, 'mercredi.repas_02', repas02)
                  _.set(menu1, 'mercredi.repas_03', repas03)
                  await menu1.save()
                  break;
                  case "Jeudi": 
                  _.set(menu1, 'jeudi.repas_01', repas01)
                  _.set(menu1, 'jeudi.repas_02', repas02)
                  _.set(menu1, 'jeudi.repas_03', repas03)
                  await menu1.save()
                  break;
              }
              }else {
                switch(jour){
                  case "Dimanche": 
                  await Menu.updateMany({}, {$set : {dimanche : {repas_01 : repas01, repas_02 : repas02, repas_03 : repas03}}} )
                  break;
                  case "Lundi": 
                  await Menu.updateMany({}, {$set : {lundi : {repas_01 : repas01, repas_02 : repas02, repas_03 : repas03}}} )
                  break;
                  case "Mardi": 
                  await Menu.updateMany({}, {$set : {mardi : {repas_01 : repas01, repas_02 : repas02, repas_03 : repas03}}} )
                  break;
                  case "Mercredi": 
                  await Menu.updateMany({}, {$set : {mercredi : {repas_01 : repas01, repas_02 : repas02, repas_03 : repas03}}} )
                  break;
                  case "Jeudi": 
                  await Menu.updateMany({}, {$set : {jeudi : {repas_01 : repas01, repas_02 : repas02, repas_03 : repas03}}} )
                  break;
                }
              }
              
              console.log("menu enregistré")
              res.status(201).json({"message":"success"})
             }catch{
            console.log("erreur lors de l'ajout du menu")
            res.status(500).send("Erreur lors de l'ajout du menu à la base de données");
          }})
    

// formulaire evenement 
siteRouter.post('/evenement', authMiddleware, upload.single('photo'), async(req, res) => {
            try {
                console.log(req.body)
                const event = new Event({
                  titre: req.body.titre,
                  description: req.body.description,
                  date: req.body.date,
                  heure: req.body.heure,
                  photoUrl: "http://localhost:8000/public/uploads/" + req.file.filename
                })
                await event.save()
                console.log("event enregistré")
                res.status(201).json({"message":"success"})
            }catch{
                console.log("erreur lors de l'ajout de l'event")
                res.status(500).send("Erreur lors de l'ajout de l'event à la base de données")
            }
})


//formulaire recrutement
siteRouter.post('/recrutement', authMiddleware, async(req, res) => {
              const { titre, description, date, heure } = req.body;
              const recrutement = new Recrutement({
                  titre : titre,
                  description : description,
                  date : date,
                  heure : heure
               })
               try{
                  await recrutement.save()
                  console.log("recrutement enregistré")
                  res.status(201).json({"message":"success"})
                  }catch{
                 console.log("erreur lors de l'ajout du recrutement")
                 res.status(500).send("Erreur lors de l'ajout du recrutement à la base de données");
               }
      })


//accepter une deamnde
siteRouter.post('/demande', authMiddleware, async(req, res) => {
         const demande = await SignUp.findById(req.body.id)
         try{
          //ajout aux parents 
          const parent = new Parents({
            num_tel : demande.informations.info_personnelles.parents.num_tel,
            pere : {
              nom : demande.informations.info_personnelles.parents.pere.nom,
              profession : demande.informations.info_personnelles.parents.pere.profession
            }, 
            mere : {
              nom : demande.informations.info_personnelles.parents.mere.nom,
              profession : demande.informations.info_personnelles.parents.mere.profession
            }
          })
          console.log(parent)
          await parent.save()
          console.log("succes parent")
          // ajout aux enfants 
          const enfant = new Enfants({
            childName : demande.childName,
            e_mail : demande.e_mail,
            age : demande.age,
            informations : {
              info_personnelles : {
                sexe : demande.informations.info_personnelles.sexe,
                dateDeNaissance : demande.informations.info_personnelles.dateDeNaissance,
                parents : parent._id        
              }
            }
          })
          await enfant.save()
          console.log("succes enfant")
          //ajout au signIn
          const signIn = new SignIn({
            e_mail : demande.e_mail,
            role : "parent",
            password : demande.password,
            idEnfant : enfant._id
         })
         await signIn.save()
         console.log("succes sign in")
          // supprimer la demande 
          await SignUp.findByIdAndDelete(req.body.id)
          console.log("succes suppression signUp")
          //envoie du mail 
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dihiadahdah@gmail.com',
        pass: 'deyexszhixwjwigq' 
      }
    });
    const link = "http://localhost:8000/parent/" + enfant._id + "/finirInscription"
    const mailOptions = {
      from: 'dihiadahdah@gmail.com',
      to: signIn.e_mail,
      subject: `Inscription accepté`,
      text: `Nous vous informons que la gérante de notre crèche a accepté votre demande d'inscription au site AhlaElBaraem, vous pouvez vous connecter à tout moment en utilisant votre adresse email et votre mot de passe, veillez finaliser votre inscription en vous connectant à votre compte sur notre site`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur lors de l'envoi du message");
      } else {
        console.log('E-mail envoyé: ' + info.response);
        res.send('Message envoyé avec succès');
        res.status(201).json({"message":"sucess"})
        console.log("demande accépté")
      }
    })
         }catch {
          console.log("erreur lors de l'acceptation de la demande")
          res.status(500).send("Erreur lors de l'acceptation de la demande");
         }
  })




module.exports = siteRouter