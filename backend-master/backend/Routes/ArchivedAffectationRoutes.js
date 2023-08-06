const express = require('express');

const {
  afficherArchivedAffectation,
  NouvelleArchivedAffectation,
  getArchivedAffectationDetails,
} = require('../controllers/ArchivedAffectationsController');
const ArchivedAffectationsController = require('../controllers/ArchivedAffectationsController');

const router4 = express.Router();

// /* affichage de l'affectation  */
// router4.get('/archived-affectation', afficherArchivedAffectation);

/* requette de l'enregistremlent de l'affectation */
router4.post('/archived-affectation', NouvelleArchivedAffectation);

/* affichage de details d'affectation  */
router4.get('/archived-affectation', getArchivedAffectationDetails);

// /* supprission d'un affectation */
// router4.delete('/deleteAffectation/:id', DeleteAffectation);

module.exports = router4;
