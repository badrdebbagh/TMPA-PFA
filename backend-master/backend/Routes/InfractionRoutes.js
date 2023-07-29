const express = require('express');
const {
  FindAllInfractions,
  FindSingleInfractions,
  AddInfractions,
  UpdateInfraction,
  DeleteInfraction,
} = require('../controllers/InfractionController');
const router2 = express.Router();

/* add infraction */
router2.post('/Infractions', AddInfractions);
/* update vehicule */
router2.put('/Infractions/:id', UpdateInfraction);

/* find all infractions */
router2.get('/Infractions', FindAllInfractions); /*  */

/* find single infractions */
router2.get('/Infractions/:id', FindSingleInfractions); /*  */

/* archiver infractions */
router2.delete('/Infractions/:id', DeleteInfraction); /*  */

module.exports = router2;
