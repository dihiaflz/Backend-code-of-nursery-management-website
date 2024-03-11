const mongoose = require("mongoose")

const nourriceCommentSchema = new mongoose.Schema({
    nomEnfant : {
        required : true,
        type : String
    },
    idEnfant : {
        required : true, 
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
        default : "Nourrice"
    }
},
)

module.exports = mongoose.model("nourriceComments", nourriceCommentSchema)