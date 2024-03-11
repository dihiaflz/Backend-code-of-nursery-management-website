const mongoose = require("mongoose")

const comportementSchema = new mongoose.Schema({
      matiere : {
         type : String
      },
      activite : {
         type : String
      },
      niveau : {
         type : String
      },
      idEnfant : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Enfants"
      }
})

module.exports = mongoose.model("comportement", comportementSchema)