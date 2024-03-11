const mongoose = require("mongoose")

const semaineSchema = new mongoose.Schema({
   comportement : {
      type : Number,
      default : 0
   },
   absences : {
      type : [Boolean],
      default : [false, false, false, false, false]
   },
   idEnfant : {
      type : mongoose.Schema.Types.ObjectId,
      ref :  "Enfants"
   }
})

module.exports = mongoose.model("semaine", semaineSchema)