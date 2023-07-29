// Importer les modèles et les dépendances nécessaires
const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/Users');
const Vehicule = require('../models/Véhicule');
const Collaborateur = require('../models/Collaborateur');


// Route pour récupérer les informations des widgets
const StatistiqueGlobal = async (req, res) => {    /* router.get('/widget-info', */
    try {
      // Récupérer les informations nécessaires pour chaque widget
      const nombreTotalUtilisateurs = await Utilisateur.countDocuments();
      const nombreNouveauxUtilisateurs = await Utilisateur.countDocuments({ createdAt: { $gte: new Date(new Date() - 24 * 60 * 60 * 1000) } });
      const nombreTotalVehicules = await Vehicule.countDocuments();
      const nombreTotalCollaborateurs = await Collaborateur.countDocuments();
  
      // Envoyer les informations en tant que réponse
      res.json({
        nombreTotalUtilisateurs,
        nombreNouveauxUtilisateurs,
        nombreTotalVehicules,
        nombreTotalCollaborateurs,   
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };


   const CercleGraphe = async (req, res) => {   /* router.get('/widget-info', */
    try {
      // Effectuez la requête d'agrégation pour compter les marques identiques
      const marqueCount = await Vehicule.aggregate([
        {
          $group: {
            _id: '$Marque',
            count: { $sum: 1 },
          },
        },
      ]);
  
      // Formattez les données pour correspondre au format attendu par votre composant frontend
      const chartData = marqueCount.map((item) => ({
        label: item._id,
        value: item.count,
      }));
  
      // Envoyez les données en tant que réponse
      res.json({
        chartData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };

  const GraphiqueAbarre = async (req, res) => {   /* router.get('/widget-info', */
  try {
    // Effectuez la requête d'agrégation pour compter les marques identiques
    const marqueCount = await Collaborateur.aggregate([
      {
        $group: {
          _id: '$Filiale',
          count: { $sum: 1 },
        },
      },
    ]);

    // Formattez les données pour correspondre au format attendu par votre composant frontend
    const BarreGraphe = marqueCount.map((item) => ({
      label: item._id,
      value: item.count,
    }));

    // Envoyez les données en tant que réponse
    res.json({
      BarreGraphe,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
  module.exports ={
    StatistiqueGlobal , 
    CercleGraphe ,
    GraphiqueAbarre
  }
  