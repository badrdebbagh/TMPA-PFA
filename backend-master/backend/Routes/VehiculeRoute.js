const express = require('express');
const {
  AddVehicule,
  FindAllVehicule,
  FindSinglVehicule,
  UpdateVehicule,
  DeleteVehicule,
} = require('../controllers/VehiculeController');

const router2 = express.Router();

/* add vehicule */
router2.post('/vehicule', AddVehicule); /*  */

/* find all vehicule */
router2.get('/vehicule', FindAllVehicule); /*  */

/* find single vehicule */
router2.get('/vehicule/:id', FindSinglVehicule); /*  */

/* update vehicule */
router2.put('/vehicule/:id', UpdateVehicule); /*  */

/* delete vehicule */
router2.delete('/vehicule/:id', DeleteVehicule); /*  */

module.exports = router2;
