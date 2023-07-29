const mongoose = require("mongoose")
const AffectationSchema = new mongoose.Schema({
  
    collaborateur : {
        /* type : String , */
        type: mongoose.Schema.Types.ObjectId,
        ref: "collaborateurs",
    },

    vehicule : {
        /* type : String , */
        type: mongoose.Schema.Types.ObjectId,
        ref: "vehicules",
    }
    
}, {timestamps : true} ) 

const AffectationModel = mongoose.model("Affectation",AffectationSchema) 
module.exports = AffectationModel