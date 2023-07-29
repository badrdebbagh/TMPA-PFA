const express = require('express');
const {
  FindAllArchivedVehicule,
  FindSingleArchivedVehicule,
} = require('../controllers/ArchivedVehiculeController');
const router2 = express.Router();

/* find all vehicule */
router2.get('/archived-vehicles', FindAllArchivedVehicule); /*  */

/* find single vehicule */
router2.get('/archived-vehicles/:id', FindSingleArchivedVehicule); /*  */

module.exports = router2;
