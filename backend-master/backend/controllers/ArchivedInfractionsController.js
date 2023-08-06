const Infractions = require('../models/Infraction');
const ArchivedInfraction = require('../models/ArchivedInfraction');

//find all infractions
const FindAllArchivedInfractions = async (req, res) => {
  try {
    const data = await ArchivedInfraction.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

//find one ArchivedInfraction
const FindSingleArchivedInfraction = async (req, res) => {
  try {
    const data = await ArchivedInfraction.findOne({ _id: req.params.id });
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

//fetch data
const fetchArchivedInfraction = async () => {
  try {
    const archivedInfractionCollection = db.collection(
      'suiviarchivedinfractions'
    ); // Remplacez par le nom de votre collection
    const infractions = await archivedInfractionCollection.find().toArray();
    return infractions;
  } catch (error) {
    console.error('Error fetching ArchivedInfraction:', error);
    throw error;
  }
};

module.exports = {
  FindAllArchivedInfractions,
  FindSingleArchivedInfraction,

  fetchArchivedInfraction,
};
