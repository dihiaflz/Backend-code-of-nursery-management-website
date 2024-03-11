const mongoose = require("mongoose")

const matieresSchema = new mongoose.Schema({
    nom : {
        type : String,
        required : true,
    },
    couleure : { 
        type : String,
        required : true
    },
    activites : {
        type : [String],
        required : true
    },
    nbr_activites : {
        type : Number,
        default : 1
    }
},
)

module.exports = mongoose.model("matieres", matieresSchema)
