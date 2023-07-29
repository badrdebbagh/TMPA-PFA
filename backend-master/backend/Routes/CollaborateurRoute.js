const express =require('express');
const { AddCollab,
     FindAllCollab,
     FindSinglCollab,
     UpdateCollab,
     DeleteCollab, 
     
     
} = require('../controllers/CollaborateurController');
const router1 = express.Router();


/* add collab */
router1.post('/collab', AddCollab) /*  */

/* find all collab */
router1.get('/collab', FindAllCollab)   /*  */

/* find single collab */
router1.get('/collab/:id', FindSinglCollab) /*  */

/* update collab */  
router1.put('/collab/:id', UpdateCollab)  /*  */

/* delete collab */
router1.delete('/collab/:id', DeleteCollab)  /*  */




module.exports = router1 ;