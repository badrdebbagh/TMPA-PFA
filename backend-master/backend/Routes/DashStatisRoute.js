const express = require('express');
const {
    StatistiqueGlobal , 
    CercleGraphe ,
    GraphiqueAbarre ,
} = require('../controllers/DashboardStatistique');
const router5 = express.Router();




router5.get('/widget-info', StatistiqueGlobal) ;
router5.get('/CercleGraphe', CercleGraphe) ;
router5.get('/GrapheBarre' , GraphiqueAbarre )


module.exports = router5