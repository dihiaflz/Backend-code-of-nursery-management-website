const express = require("express")
const finirInscriptionsRouter = express.Router()
const Enafnts = require("../models/Enfants")
const authMiddleware = require("../authMiddleware")

// finaliser les inscriptions
finirInscriptionsRouter.post("/:id", authMiddleware, async(req, res) => {
    try{
      console.log(req.body.allergies.split("\n"))
        const update = {
            $set: {
              'informations.infos_medicales.allergies': req.body.allergies.split("\n"),
              'informations.infos_medicales.medicaments': req.body.medicaments.split("\n"),
              'informations.infos_medicales.conditions_medicales': req.body.conditions_medicales.split("\n"),
              'informations.infos_medicales.vaccins': req.body.vaccins.split("\n"),
              'informations.infos_medicales.antecedants_medicaux': req.body.antecedants_medicaux.split("\n"),
              'informations.infos_medicales.instructions_speciales': req.body.instructions_speciales.split("\n"),
              'informations.habitudes_alimentaires.nutritionHabituelle': req.body.nutritionHabituelle,
              'informations.habitudes_alimentaires.nutritionSeul': req.body.nutritionSeul,
              'informations.habitudes_alimentaires.nutritionAvecAide': req.body.nutritionAvecAide,
              'informations.habitudes_alimentaires.alimentsDetestes': req.body.alimentsDetestes.split("\n"),
              'informations.habitudes_alimentaires.alimentsPreferes': req.body.alimentsPreferes.split("\n"),
              'informations.habitudes_alimentaires.sonAppetit': req.body.sonAppetit,
              'informations.elimination.independant': req.body.independant,
              'informations.elimination.signaleDeBesoin': req.body.signaleDeBesoin,
              'informations.elimination.elimination_intestinale': req.body.elimination_intestinale,
              'informations.elimination.pot': req.body.pot,
              'informations.elimination.joumeliere': req.body.joumeliere,
              'informations.habitudes_deSommeil.sieste': req.body.sieste,
              'informations.habitudes_deSommeil.heure': req.body.heure,
              'informations.habitudes_deSommeil.avecQui': req.body.avecQui,
              'informations.habitudes_deSommeil.routineSommeil': req.body.routineSommeil,
            }
          }
          console.log(update)
        await Enafnts.updateOne({_id : req.params.id }, update)
        res.status(201).json({"message":"success"})
      }catch{
          console.log("erreur lors de la finalisation des inscriptions")
          res.status(500).send("Erreur lors de la finalisation des inscriptions");
        }
})


module.exports = finirInscriptionsRouter;