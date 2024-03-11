const mongoose = require("mongoose")

const signUpSchema = new mongoose.Schema({
    childName : {
        type : String,
        required : true 
    },
    e_mail : {
        type : String,
        required : true 
    },
    age : {
        type : Number
      },
    password : {
        type : String,
        required : true
      },
    informations : {
        info_personnelles : {
            sexe : {
              type : String,
              required : true  
            },
            dateDeNaissance : {
              type : String,
              required : true  
            },
            parents : {
                 num_tel : {
                   type : Number,
                   required : true,
                 },
                 pere : {
                   nom : {
                     type : String,
                     required : true
                   },
                   profession : {
                    type : String,
                    required : true
                  }
                 },
                 mere : {
                     nom : {
                         type : String,
                         required : true
                     },
                     profession : {
                      type : String,
                      required : true
                    }
                 }
            },
        },      
    }
}, { collection : "signUp"}
)

module.exports = mongoose.model("signUp", signUpSchema)