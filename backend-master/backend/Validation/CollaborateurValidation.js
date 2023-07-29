const isEmpty = require('./isEmpty');
const validator = require('validator');
const moment = require('moment');
module.exports = function ValidateCollab(data) {
  let errors = {};
  
  data.Nom = !isEmpty(data.Nom) ? data.Nom : "";
  data.Prenom = !isEmpty(data.Prenom) ? data.Prenom : "";
  data.Filiale = !isEmpty(data.Filiale) ? data.Filiale : "";
  data.Direction = !isEmpty(data.Direction) ? data.Direction : "";
  data.Matricule = !isEmpty(data.Matricule) ? data.Matricule : "";
  data.Grade = !isEmpty(data.Grade) ? data.Grade : "";
  data.Email = !isEmpty(data.Email) ? data.Email : "";
  data.NumeroGsm = !isEmpty(data.NumeroGsm) ? data.NumeroGsm : "";
  data.NumeroGsmPersonnel = !isEmpty(data.NumeroGsmPersonnel) ? data.NumeroGsmPersonnel : "";
  data.TelephoneFixe = !isEmpty(data.TelephoneFixe) ? data.TelephoneFixe : "";
  data.Permis = !isEmpty(data.Permis) ? data.Permis : "";
  data.CIN = !isEmpty(data.CIN) ? data.CIN : "";
  data.NumeroPassport = !isEmpty(data.NumeroPassport) ? data.NumeroPassport : "";
 /*  data.DateValiditéCIN = !isEmpty(data.DateValiditéCIN) ? data.DateValiditéCIN : "";
  data.DateValiditePermis = !isEmpty(data.DateValiditePermis) ? data.DateValiditePermis : "";
  data.DateValiditéPassport = !isEmpty(data.DateValiditéPassport) ? data.DateValiditéPassport : "";  */ 
 // Convertir les champs de date en objets de type Date
data.DateValiditePermis = moment(data.DateValiditePermis, 'MM/DD/YYYY').toDate();
data.DateValiditéCIN = moment(data.DateValiditéCIN, 'MM/DD/YYYY').toDate();
data.DateValiditéPassport = moment(data.DateValiditéPassport, 'MM/DD/YYYY').toDate();
 
  if (!validator.isEmail(data.Email)) {
    errors.Email = "Format Email required";
  }
  if (validator.isEmpty(data.Email)) {
    errors.Email = "Required Email";
  }
  if (validator.isEmpty(data.Nom)) {
    errors.Nom = "Required Lastname";
  }
  if (validator.isEmpty(data.Prenom)) {
    errors.Prenom = "Required Firstname";
  }
   if (validator.isEmpty(data.Filiale)) {
    errors.Filiale = "Required Filiale";
  } 
  if (validator.isEmpty(data.Direction)) {
    errors.Direction = "Required Direction";
  } 
  if (validator.isEmpty(data.Matricule)) {
    errors.Matricule = "Required Matricule";
  }
  if (validator.isEmpty(data.Grade)) {
    errors.Grade = "Required Grade";
  }
  if (validator.isEmpty(data.NumeroGsm)) {
    errors.NumeroGsm = "Required NumeroGsm";
  }
  if (validator.isEmpty(data.NumeroGsmPersonnel)) {
    errors.NumeroGsmPersonnel = "Required NumeroGsmPersonnel";
  }
  if (validator.isEmpty(data.TelephoneFixe)) {
    errors.TelephoneFixe = "Required TelephoneFixe";
  }
  if (validator.isEmpty(data.Permis)) {
    errors.Permis = "Required Permis";
  }
  if (validator.isEmpty(data.CIN)) {
    errors.CIN = "Required CIN";
  }
  if (validator.isEmpty(data.NumeroPassport)) {
    errors.NumeroPassport = "Required NumeroPassport";
  }
/*  if (validator.isEmpty(data.DateValiditePermis)) {
    errors.DateValiditePermis = "Required DateValiditéPermis";
  } 
 if (validator.isEmpty(data.DateValiditéCIN)) {
    errors.DateValiditéCIN = "Required DateValiditéCIN";
  } 
if (validator.isEmpty(data.DateValiditéPassport)) {
    errors.DateValiditéPassport = "Required DateValiditéPassport";
  }   */
 // Valider les champs de date
if (!moment(data.DateValiditePermis).isValid()) {
  errors.DateValiditePermis = "Date validité Permis invalide";
}

if (!moment(data.DateValiditéCIN).isValid()) {
  errors.DateValiditéCIN = "Date validité CIN invalide";
}

if (!moment(data.DateValiditéPassport).isValid()) {
  errors.DateValiditéPassport = "Date validité Passport invalide";
}


  return {
      errors,
      isValid: isEmpty(errors)
  }
};