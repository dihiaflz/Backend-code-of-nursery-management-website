const mongoose = require("mongoose")

const orthoCommentSchema = new mongoose.Schema({
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
        default : "Orthophoniste"
    }
},
)

module.exports = mongoose.model("orthoComment", orthoCommentSchema)