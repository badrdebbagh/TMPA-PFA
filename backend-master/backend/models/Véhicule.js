const mongoose = require('mongoose');
const VehSchema = new mongoose.Schema({
  Num_parc: {
    type: String,
  },
  WW: {
    type: String,
  },
  Num_Chassis: {
    type: String,
  },
  DM_Circulation: {
    type: String,
  },
  Pf: {
    type: Number,
  },
  Num_Immat: {
    type: String,
  },
  Marque: {
    type: String,
  },
  Couleur: {
    type: String,
  },
  Prestataire: {
    type: String,
  },
  Font_Service: {
    type: String,
  },
  Ref_Pneus: {
    type: String,
  },
  Echeance_Aut_Circulation: {
    type: String,
  },
  Echaence_Visite_Tech: {
    type: String,
  },
  Assurance_Contrat_Cours: {
    type: String,
  },
  Cartes_Verte: {
    type: String,
  },
  Vignete: {
    type: String,
  },
  Collaborateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collaborateur',
  },
});
// Création du modèle Collaborateur à partir du schéma
const VehiculeModel = mongoose.model('vehicules', VehSchema);
// Exportation du modèle Collaborateur
module.exports = VehiculeModel;
