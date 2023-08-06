const VehiculeModel = require('../models/Véhicule');
const ArchivedVehicule = require('../models/ArchivedVehicules');
const ValidateVehicule = require('../Validation/VehiculeValidation');

//find all work
const FindAllArchivedVehicule = async (req, res) => {
  try {
    const data = await ArchivedVehicule.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};
// find one work
const FindSingleArchivedVehicule = async (req, res) => {
  try {
    const data = await ArchivedVehicule.findOne({ _id: req.params.id });
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

//fetch data
const fetchVehicles = async () => {
  try {
    const vehiculesCollection = db.collection('archivedvehicles'); // Remplacez par le nom de votre collection
    const vehicles = await vehiculesCollection.find().toArray();
    return vehicles;
  } catch (error) {
    console.error('Error fetching vehicules:', error);
    throw error;
  }
};

module.exports = {
  FindAllArchivedVehicule,
  FindSingleArchivedVehicule,
  fetchVehicles,
};
