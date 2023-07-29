const express = require('express');
const router = express.Router();

// Importer les modèles de véhicule et de collaborateur
const Vehicule = require('../models/Véhicule');
const Collaborateur = require('../models/Collaborateur');
const Affectation = require('../models/Affectation');

// GET route pour afficher la page d'affectations
const afficherAffectation = async (req, res) => {
  try {
    // Récupérer tous les collaborateurs et véhicules
    const collaborateurs = await Collaborateur.find();
    const vehicules = await Vehicule.find();

    res.render('affectations', { collaborateurs, vehicules });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};

const NouvelleAffectation = async (req, res) => {
  try {
    const { collaborateurId, vehiculeId } = req.body;

    const collaborateur = await Collaborateur.findById(collaborateurId);
    if (!collaborateur) {
      return res.status(404).send('Collaborateur introuvable');
    }

    const vehicule = await Vehicule.findById(vehiculeId);
    if (!vehicule) {
      return res.status(404).send('Véhicule introuvable');
    }

    const affectation = new Affectation({
      collaborateur: collaborateurId,
      vehicule: vehiculeId,
    });

    await affectation.save();

    const affectationDetails = await Affectation.aggregate([
      {
        $match: {
          _id: affectation._id,
        },
      },
      {
        $lookup: {
          from: 'collaborateurs',
          localField: 'collaborateur',
          foreignField: '_id',
          as: 'collaborateurDetails',
        },
      },
      {
        $lookup: {
          from: 'vehicules',
          localField: 'vehicule',
          foreignField: '_id',
          as: 'vehiculeDetails',
        },
      },
      {
        $project: {
          'collaborateurDetails.Nom': 1,
          'collaborateurDetails.Prenom': 1,
          'collaborateurDetails.Filiale': 1,
          'collaborateurDetails.Direction': 1,
          'collaborateurDetails.Matricule': 1,
          'collaborateurDetails.Grade': 1,
          'collaborateurDetails.Email': 1,
          'collaborateurDetails.NumeroGsm': 1,
          'collaborateurDetails.NumeroGsmPersonnel': 1,
          'collaborateurDetails.TelephoneFixe': 1,
          'collaborateurDetails.Permis': 1,
          'collaborateurDetails.DateValiditePermis': 1,
          'collaborateurDetails.CIN': 1,
          'collaborateurDetails.DateValiditéCIN': 1,
          'collaborateurDetails.NumeroPassport': 1,
          'collaborateurDetails.DateValiditéPassport': 1,
          'vehiculeDetails.Num_parc': 1,
          'vehiculeDetails.WW': 1,
          'vehiculeDetails.Num_Chassis': 1,
          'vehiculeDetails.DM_Circulation': 1,
          'vehiculeDetails.Pf': 1,
          'vehiculeDetails.Num_Immat': 1,
          'vehiculeDetails.Marque': 1,
          'vehiculeDetails.Couleur': 1,
          'vehiculeDetails.Prestataire': 1,
          'vehiculeDetails.Font_Service': 1,
          'vehiculeDetails.Ref_Pneus': 1,
          'vehiculeDetails.Echeance_Aut_Circulation': 1,
          'vehiculeDetails.Echaence_Visite_Tech': 1,
          'vehiculeDetails.Assurance_Contrat_Cours': 1,
          'vehiculeDetails.Cartes_Verte': 1,
          'vehiculeDetails.Vignete': 1,
        },
      },
    ]);

    return res.send(affectationDetails);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("Une erreur est survenue lors de la création de l'affectation");
  }
};

const getAffectationDetails = async (req, res) => {
  /*  try {
    const affectationId = req.params.id;
    const affectationDetails = await Affectation.aggregate([
      {
        $match: {
          _id: affectationId,
        },
      },
      {
        $lookup: {
          from: 'collaborateurs',
          localField: 'collaborateur',
          foreignField: '_id',
          as: 'collaborateurDetails',
        },
      },
      {
        $lookup: {
          from: 'vehicules',
          localField: 'vehicule',
          foreignField: '_id',
          as: 'vehiculeDetails',
        },
      },
      {
        $project: {
          'collaborateurDetails.Nom': 1,
          'collaborateurDetails.Prenom': 1,
          'collaborateurDetails.Filiale': 1,
          'collaborateurDetails.Direction': 1,
          'collaborateurDetails.Matricule': 1,
          'collaborateurDetails.Grade': 1,
          'collaborateurDetails.Email': 1,
          'collaborateurDetails.NumeroGsm': 1,
          'collaborateurDetails.NumeroGsmPersonnel': 1,
          'collaborateurDetails.TelephoneFixe': 1,
          'collaborateurDetails.Permis': 1,
          'collaborateurDetails.DateValiditePermis': 1,
          'collaborateurDetails.CIN': 1,
          'collaborateurDetails.DateValiditéCIN': 1,
          'collaborateurDetails.NumeroPassport': 1,
          'collaborateurDetails.DateValiditéPassport': 1,
          'vehiculeDetails.Num_parc': 1,
          'vehiculeDetails.WW': 1,
          'vehiculeDetails.Num_Chassis': 1,
          'vehiculeDetails.DM_Circulation': 1,
          'vehiculeDetails.Pf': 1,
          'vehiculeDetails.Num_Immat': 1,
          'vehiculeDetails.Marque': 1,
          'vehiculeDetails.Couleur': 1,
          'vehiculeDetails.Prestataire': 1,
          'vehiculeDetails.Font_Service': 1,
          'vehiculeDetails.Ref_Pneus': 1,
          'vehiculeDetails.Echeance_Aut_Circulation': 1,
          'vehiculeDetails.Echaence_Visite_Tech': 1,
          'vehiculeDetails.Assurance_Contrat_Cours': 1,
          'vehiculeDetails.Cartes_Verte': 1,
          'vehiculeDetails.Vignete': 1,
        },
      },
    ]);

    if (affectationDetails.length === 0) {
      return res.status(404).send('Affectation introuvable');
    }

    return res.send(affectationDetails[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Une erreur est survenue lors de la récupération des détails d\'affectation');
  }; 
  try {
    
      const affectations = await Affectation.find()
        .populate('collaborateur') // Populer le chemin 'collaborateur'
        .populate('vehicules'); // Populer le chemin 'vehicule'
  
      res.send(affectations);
    } catch (error) {
      console.error(error);
      res.status(500).send('Une erreur est survenue lors de la récupération des affectations');
    }*/
  try {
    const affectationDetails = await Affectation.aggregate([
      {
        $lookup: {
          from: 'collaborateurs',
          localField: 'collaborateur',
          foreignField: '_id',
          as: 'collaborateurDetails',
        },
      },
      {
        $lookup: {
          from: 'vehicules',
          localField: 'vehicule',
          foreignField: '_id',
          as: 'vehiculeDetails',
        },
      },
      {
        $project: {
          'collaborateurDetails.Nom': 1,
          'collaborateurDetails.Prenom': 1,
          'collaborateurDetails.Filiale': 1,
          'collaborateurDetails.Direction': 1,
          'collaborateurDetails.Matricule': 1,
          'collaborateurDetails.Grade': 1,
          'collaborateurDetails.Email': 1,
          'collaborateurDetails.NumeroGsm': 1,
          'collaborateurDetails.NumeroGsmPersonnel': 1,
          'collaborateurDetails.TelephoneFixe': 1,
          'collaborateurDetails.Permis': 1,
          'collaborateurDetails.DateValiditePermis': 1,
          'collaborateurDetails.CIN': 1,
          'collaborateurDetails.DateValiditéCIN': 1,
          'collaborateurDetails.NumeroPassport': 1,
          'collaborateurDetails.DateValiditéPassport': 1,
          'vehiculeDetails.Num_parc': 1,
          'vehiculeDetails.WW': 1,
          'vehiculeDetails.Num_Chassis': 1,
          'vehiculeDetails.DM_Circulation': 1,
          'vehiculeDetails.Pf': 1,
          'vehiculeDetails.Num_Immat': 1,
          'vehiculeDetails.Marque': 1,
          'vehiculeDetails.Couleur': 1,
          'vehiculeDetails.Prestataire': 1,
          'vehiculeDetails.Font_Service': 1,
          'vehiculeDetails.Ref_Pneus': 1,
          'vehiculeDetails.Echeance_Aut_Circulation': 1,
          'vehiculeDetails.Echaence_Visite_Tech': 1,
          'vehiculeDetails.Assurance_Contrat_Cours': 1,
          'vehiculeDetails.Cartes_Verte': 1,
          'vehiculeDetails.Vignete': 1,
        },
      },
    ]);

    return res.send(affectationDetails);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send(
        'Une erreur est survenue lors de la récupération des détails des affectations'
      );
  }
};

// delete work
const DeleteAffectation = async (req, res) => {
  try {
    await Affectation.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: 'Affectation deleted with success' });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  afficherAffectation,
  NouvelleAffectation,
  getAffectationDetails,
  DeleteAffectation,
};
