require("dotenv").config()
const express = require("express")
const signInRouter = express.Router()
const bcrypt = require("bcrypt")
const SignIn = require("../models/SignIn")
const Enafnts = require("../models/Enfants")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const Enfants = require("../models/Enfants")
const _ = require('lodash')
const jwt = require("jsonwebtoken")
const authMiddlewareProv = require("../authMiddlewareProv")

let randomNumber

signInRouter.post("/", async (req, res) => {
  try {
    const user = await SignIn.findOne({ e_mail: req.body.e_mail });
    if (!user) {
      return res.status(400).send("Ce nom n'existe pas");
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Mot de passe incorrect");
    }

    let state = "Inscriptions terminées";
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "7d" });

    if (user.role === "parent") {
      const enfant = await Enfants.findById(user.idEnfant);
      const test = _.get(enfant, "informations.elimination.independant")
      if (!test) {
        state = "Inscriptions non terminées";
      }
    }
    const response = [token, state];
    res.status(201).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});


signInRouter.post("/forgotPassword", async (req, res) => {
    try{
    const user = await SignIn.find({e_mail : {$eq : req.body.e_mail}})
    console.log(user)
    if(user == null){
        res.status(400).send("ce nom n'existe pas")
    }else{
      const token_provisoir = jwt.sign({ user }, process.env.SECRET_PROVISOIR, { expiresIn: "10m" });
      const randomBytes = crypto.randomBytes(2); // Génère 2 octets de données aléatoires
      randomNumber = (randomBytes.readUInt16BE(0) % 90000) + 10000; // Convertit les données en un nombre de 5 chiffres
      console.log(randomNumber)

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dihiadahdah@gmail.com',
          pass: 'deyexszhixwjwigq' 
        }
      });
      console.log(req.body.e_mail)
    const mailOptions = {
      from: 'dihiadahdah@gmail.com',
      to: req.body.e_mail,
      subject: `Code de réinitialisation`,
      text: "Votre code de confirmation est " + randomNumber
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur lors de l'envoi du code de confirmation");
      } else {
        console.log('E-mail envoyé: ' + info.response)
        res.status(201).json([{"message":"success"}, token_provisoir])
        console.log("code envoyé")
      }
    })
    }
    }catch (err) {
    console.log("erreur lors de l'envoie du code");
    res.status(500).send("erreur lors de l'envoie du code");
}
})

signInRouter.post("/forgotPassword/code", authMiddlewareProv, async (req, res) => {
  try{
    console.log(randomNumber)
    if(req.body.code == randomNumber){
      console.log("code correct")
      res.status(201).send("code correct")
    }else{
      console.log("le code fournit est incorrecte")
      res.status(404).send("le code fournit est incorrect")
    }
  }catch (err){
    console.log("erreur lors de la vérification du code");
    res.status(500).send("erreur lors de la vérification du code");
  }
})

signInRouter.post("/forgotPassword/new", authMiddlewareProv, async (req, res) => {
  try{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(hashedPassword)
    await SignIn.updateOne({ e_mail: req.body.e_mail }, { $set: { password: hashedPassword } })
    res.status(201).send("success password change")
  }catch (err){
    console.log("erreur lors de la réinitialisation du mot de passe");
    res.status(500).send("erreur lors de la réinitialisation du mot de passe");
  }
})


signInRouter.post("/generateCrypt", async(req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(hashedPassword)
    res.status(201)
})

module.exports = signInRouter;