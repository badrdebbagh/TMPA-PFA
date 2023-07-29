const isEmpty = require('./isEmpty');
const validator = require('validator');


module.exports = function ValidateVehicule(data) {
  let errors = {};
  
  data.Num_parc = !isEmpty(data.Num_parc) ? data.Num_parc : "";
  data.WW = !isEmpty(data.WW) ? data.WW : "";
  data.Num_Chassis = !isEmpty(data.Num_Chassis) ? data.Num_Chassis : "";
  data.DM_Circulation = !isEmpty(data.DM_Circulation) ? data.DM_Circulation : "";
  data.Pf = !isEmpty(data.Pf) ? data.Pf : "";
  data.Num_Immat = !isEmpty(data.Num_Immat) ? data.Num_Immat : "";
  data.Marque = !isEmpty(data.Marque) ? data.Marque : "";
  data.Couleur = !isEmpty(data.Couleur) ? data.Couleur : "";
  data.Prestataire = !isEmpty(data.Prestataire) ? data.Prestataire : "";
  data.Font_Service = !isEmpty(data.Font_Service) ? data.Font_Service : "";
  data.Ref_Pneus = !isEmpty(data.Ref_Pneus) ? data.Ref_Pneus : "";
  data.Echeance_Aut_Circulation = !isEmpty(data.Echeance_Aut_Circulation) ? data.Echeance_Aut_Circulation : "";
  data.Echaence_Visite_Tech = !isEmpty(data.Echaence_Visite_Tech) ? data.Echaence_Visite_Tech : "";
  data.Assurance_Contrat_Cours = !isEmpty(data.Assurance_Contrat_Cours) ? data.Assurance_Contrat_Cours : "";
  data.Cartes_Verte = !isEmpty(data.Cartes_Verte) ? data.Cartes_Verte : "";
  data.Vignete = !isEmpty(data.Vignete) ? data.Vignete : "";
 
   if (validator.isEmpty(data.Num_parc)) {
    errors.Num_parc = "Required Num_parc";
  }
  if (validator.isEmpty(data.WW)) {
    errors.WW = "Required WW";
  }
  if (validator.isEmpty(data.Num_Chassis)) {
    errors.Num_Chassis = "Required Num_Chassis";
  }
   if (validator.isEmpty(data.DM_Circulation)) {
    errors.DM_Circulation = "Required DM_Circulation";
  } 
  if (validator.isEmpty(data.Pf.toString())) {  /* isEmpty */
    errors.Pf = "Required Pf"; 
  } 
  if (!isNaN(data.Pf)) {
    data.Pf = Number(data.Pf);
  } else {
    errors.Pf = "Le champ Pf doit être un Nombre valide";
  }
 
  if (validator.isEmpty(data.Num_Immat)) {  
    errors.Num_Immat = "Required Num_Immat";
  }
  if (validator.isEmpty(data.Marque)) {
    errors.Marque = "Required Marque";
  }
  if (validator.isEmpty(data.Couleur)) {
    errors.Couleur = "Required Couleur";
  }
  if (validator.isEmpty(data.Prestataire)) {
    errors.Prestataire = "Required Prestataire";
  }
  if (validator.isEmpty(data.Font_Service)) {
    errors.Font_Service = "Required Font_Service";
  }
  if (validator.isEmpty(data.Ref_Pneus)) {
    errors.Ref_Pneus = "Required Ref_Pneus";
  }
  if (validator.isEmpty(data.Echeance_Aut_Circulation)) {   /* isEmpty */
    errors.Echeance_Aut_Circulation = "Required Echeance_Aut_Circulation";
  }
  if (validator.isEmpty(data.Echaence_Visite_Tech)) {  /* isEmpty */
    errors.Echaence_Visite_Tech = "Required Echaence_Visite_Tech";
  }
 if (validator.isEmpty(data.Assurance_Contrat_Cours)) { /* isEmpty */
    errors.Assurance_Contrat_Cours = "Required Assurance_Contrat_Cours";
  } 
 if (validator.isEmpty(data.Cartes_Verte)) {
    errors.Cartes_Verte = "Required Cartes_Verte";
  } 
if (validator.isEmpty(data.Vignete)) {  /* isEmpty */
    errors.Vignete = "Required Vignete";
  } 
 
    

  return {
      errors,
      isValid: isEmpty(errors)
  }
};