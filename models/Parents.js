const mongoose = require("mongoose")

const parentsSchema = new mongoose.Schema({
    
    num_tel : {
      type : Number,
      required : true
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
}, { collection : "parents"}
)

module.exports = mongoose.model("Parents", parentsSchema)