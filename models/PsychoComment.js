const mongoose = require("mongoose")

const psychoCommentSchema = new mongoose.Schema({
    nomEnfant : {
        required : true,
        type : String
    },
    idEnfant : {
        resuired : true, 
        type : mongoose.Schema.Types.ObjectId,
        ref :  "Enafnts"
    },
    comment : {
        required : true, 
        type : String
    },
    date : {
        type : Date,
        default : Date.now
    },
    nom : {
        type : String,
        default : "Psychologue"
    }
},
)

module.exports = mongoose.model("psychoComment", psychoCommentSchema)