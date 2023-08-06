const mongoose = require('mongoose');
const ArchivedAffectationSchema = new mongoose.Schema(
  {
    collaborateur: {
      /* type : String , */
      type: mongoose.Schema.Types.ObjectId,
      ref: 'collaborateurs',
    },

    vehicule: {
      /* type : String , */
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vehicules',
    },
  },
  { timestamps: true }
);

const ArchivedAffectationModel = mongoose.model(
  'ArchivedAffectation',
  ArchivedAffectationSchema
);
module.exports = ArchivedAffectationModel;
