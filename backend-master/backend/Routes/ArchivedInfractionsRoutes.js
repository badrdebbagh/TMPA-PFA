const express = require('express');
const {
  FindAllArchivedInfractions,
  FindSingleArchivedInfraction,
} = require('../controllers/ArchivedInfractionsController');
const router2 = express.Router();

/* find all infractions */
router2.get('/archivedInfractions', FindAllArchivedInfractions); /*  */

/* find single infractions */
router2.get('/archivedInfractions/:id', FindSingleArchivedInfraction); /*  */
router2.get('/api/archivedInfractions', FindAllArchivedInfractions);

module.exports = router2;
