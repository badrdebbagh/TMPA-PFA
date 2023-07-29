const express = require('express');
const {
    afficherAffectation ,
    NouvelleAffectation ,
    getAffectationDetails,
    DeleteAffectation
} = require('../controllers/AffectationsController')

const router4 = express.Router();


/* affichage de l'affectation  */
router4.get('/affectation',afficherAffectation) ;

/* requette de l'enregistremlent de l'affectation */
router4.post('/affectation',NouvelleAffectation);

/* affichage de details d'affectation  */
router4.get('/affectations1',getAffectationDetails);  

/* supprission d'un affectation */
router4.delete('/deleteAffectation/:id',DeleteAffectation)
  
module.exports = router4 ;     