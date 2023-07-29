const mongoose = require('mongoose');

// Define the schema for Suivi des Infractions
const suiviArchivedInfraction = new mongoose.Schema({
  declarationAuteur: {
    type: String,
    // required: true,
  },
  numeroDeclaration: {
    type: String,
    // required: true,
  },
  immatriculationVehicule: {
    type: String,
    // required: true,
  },
  dateHeureInfraction: {
    type: String,
    // required: true,
  },
  lieuInfraction: {
    type: String,
    // required: true,
  },
  excesDeVitesse: {
    type: String,
    default: false,
  },
  vitesseEnregistree: {
    type: String,
    // required: true,
  },
  vitesseAutorisee: {
    type: String,
    // required: true,
  },
  dateConstatation: {
    type: String,
    // required: true,
  },
  montantInfraction: {
    type: String,
    // required: true,
  },
  nombrePointsRetires: {
    type: String,
    // required: true,
  },
});

// Create the Suivi des Infractions model
const SuiviArchivedInfractions = mongoose.model(
  'suiviarchivedInfractions',
  suiviArchivedInfraction
);

module.exports = SuiviArchivedInfractions;
