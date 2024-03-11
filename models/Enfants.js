const mongoose = require("mongoose")

const enfantsSchema = new mongoose.Schema({
    childName : {
        type : String,
        required : true 
    },
    e_mail : {
        type : String,
        required : true 
    },
    age : {
        type : Number,
        required : true 
    },
    informations : {
        info_personnelles : {
            sexe : {
              type : String,
              
            },
            dateDeNaissance : {
              type : String,
              
            },
            parents : {
              type : mongoose.Schema.Types.ObjectId,
              ref :  "Parents"
            },
        },
        infos_medicales : {
            allergies : {
                type : [String]
              },
            medicaments : {
                type : [String]
              },
            conditions_medicales : {
                type : [String],
              },
            vaccins : {
                type : [String],
                
              },
            antecedants_medicaux : {
                type : [String], 
              },
            instructions_speciales : {
                type : [String],  
              },
        },
        habitudes_alimentaires : {
            nutritionHabituelle : {
                type : String,
                
              },
            nutritionSeul : {
                type : String,
                
              },
            nutritionAvecAide : {
                type : String,
                
              },
            alimentsDetestes : {
                type : [String],
                
              },
            alimentsPreferes : {
                type : [String],
                
              },
            sonAppetit: {
                type : String,
                
              },
        },
        elimination : {
            independant : {
                type : String,
                
              },
            signaleDeBesoin : {
                type : String,  
              },
            elimination_intestinale : {
                type : String,
                
              },
            pot : {
                type : String,
                
              },
            joumeliere : {
                type : String,
                
              },
        },
        habitudes_deSommeil : {
            sieste : {
                type : String,
                
              },
            heure : {
                type : String,  
              },
            avecQui : {
                type : String, 
              },
            routineSommeil : {
                type : String,
                
              } 
        }
    }
}, { collection : "enfants"}
)

module.exports = mongoose.model("enfants", enfantsSchema)