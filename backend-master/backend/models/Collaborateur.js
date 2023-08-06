const mongoose = require('mongoose');
const CollabSchema = new mongoose.Schema(
  {
    Nom: {
      /*  */ type: String,
    },
    Prenom: {
      /*  */ type: String,
    },
    Filiale: {
      /*  */ type: String,
    },
    Direction: {
      /*  */ type: String,
    },
    Matricule: {
      /*  */ type: String,
    },
    Grade: {
      /*  */ type: String,
    },
    Email: {
      /*  */ type: String,
    },
    NumeroGsm: {
      /*  */ type: String,
    },
    NumeroGsmPersonnel: {
      /*  */ type: String,
    },
    TelephoneFixe: {
      /*  */ type: String,
    },
    Permis: {
      /*  */ type: String,
    },
    DateValiditePermis: {
      /*  */
      type: Date,
      /*  required:true , */
    },
    CIN: {
      /*  */ type: String,
    },
    DateValiditéCIN: {
      /*  */
      type: Date,
      /* required:true , */
    },
    NumeroPassport: {
      /*  */ type: String,
    },
    DateValiditéPassport: {
      /*  */
      type: Date,
      /* required:true , */
    },
    Vehicules: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vehicules',
    },
  },
  { timestamps: true }
);

const CollabModel = mongoose.model('Collaborateur', CollabSchema);
module.exports = CollabModel;
