const express = require('express');
const router = express.Router();

// Importer les modèles de véhicule et de collaborateur
const Vehicule = require('../models/Véhicule');
const Collaborateur = require('../models/Collaborateur');
const Affectation = require('../models/Affectation');
const ArchivedAffectationModel = require('../models/ArchivedAffectation');

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
    const affectation = await Affectation.findById(req.params.id);

    // Check if the vehicle exists
    if (!affectation) {
      return res.status(404).json({ message: 'affectation not found' });
    }

    // Create a new archived vehicle object with the data from the original vehicle
    const archivedAffectation = new ArchivedAffectationModel({
      collaborateur: affectation.collaborateur,
      vehicule: affectation.vehicule,
    });

    // Save the archived affectation to the archive database
    await archivedAffectation.save();

    // Remove the vehicle from the main database
    await affectation.deleteOne();

    res.json({ message: 'affecttation archived successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  afficherAffectation,
  NouvelleAffectation,
  getAffectationDetails,
  DeleteAffectation,
};
