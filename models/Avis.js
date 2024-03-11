const mongoose = require("mongoose");

const avisSchema = new mongoose.Schema({
    nom : {
        type : String,
        required : true,
    },
    nomEnfant : {
        type : String,
        required : true
    },
    avis : {
        type : String,
        required : true
    }

});

module.exports = mongoose.model("avis", avisSchema);