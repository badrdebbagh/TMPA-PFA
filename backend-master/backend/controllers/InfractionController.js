const Infractions = require('../models/Infraction');
const ArchivedInfraction = require('../models/ArchivedInfraction');

const AddInfractions = async (req, res) => {
  try {
    await Infractions.findOne({
      numeroDeclaration: req.body.numeroDeclaration,
    }).then(async (exist) => {
      if (exist) {
        res.status(409).json({ error: 'Infraction already exists' });
      } else {
        const newInfraction = {
          declarationAuteur: req.body.declarationAuteur,
          numeroDeclaration: req.body.numeroDeclaration,
          immatriculationVehicule: req.body.immatriculationVehicule,
          dateHeureInfraction: req.body.dateHeureInfraction,
          lieuInfraction: req.body.lieuInfraction,
          excesDeVitesse: req.body.excesDeVitesse,
          vitesseEnregistree: req.body.vitesseEnregistree,
          vitesseAutorisee: req.body.vitesseAutorisee,
          dateConstatation: req.body.dateConstatation,
          montantInfraction: req.body.montantInfraction,
          nombrePointsRetires: req.body.nombrePointsRetires,
        };

        await Infractions.create(req.body);
        res.status(201).json({ message: 'Infraction added with success' });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Update infractions
const UpdateInfraction = async (req, res) => {
  // const { errors, isValid } = ValidateInfraction(req.body);
  try {
    const data = await Infractions.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    /*  res.status(201).json(data); */
    res
      .status(201)
      .json({ message: 'Infraction Updated with success', data: data });
  } catch (error) {
    console.log(error.message);
  }
};

//find all infractions
const FindAllInfractions = async (req, res) => {
  try {
    const data = await Infractions.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

//find one infractions
const FindSingleInfractions = async (req, res) => {
  try {
    const data = await Infractions.findOne({ _id: req.params.id });
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

//fetch data
const fetchInfractions = async () => {
  try {
    const infractionsCollection = db.collection('suiviinfractions'); // Remplacez par le nom de votre collection
    const vehicles = await infractionsCollection.find().toArray();
    return vehicles;
  } catch (error) {
    console.error('Error fetching Infractions:', error);
    throw error;
  }
};

const DeleteInfraction = async (req, res) => {
  try {
    const infraction = await Infractions.findById(req.params.id);

    // Check if the infraction exists
    if (!infraction) {
      return res.status(404).json({ message: 'Infraction not found' });
    }

    // Create a new archived vehicle object with the data from the original vehicle
    const archivedInfraction = new ArchivedInfraction({
      declarationAuteur: infraction.declarationAuteur,
      numeroDeclaration: infraction.numeroDeclaration,
      immatriculationVehicule: infraction.immatriculationVehicule,
      dateHeureInfraction: infraction.dateHeureInfraction,
      lieuInfraction: infraction.lieuInfraction,
      excesDeVitesse: infraction.excesDeVitesse,
      vitesseEnregistree: infraction.vitesseEnregistree,
      vitesseAutorisee: infraction.vitesseAutorisee,
      dateConstatation: infraction.dateConstatation,
      montantInfraction: infraction.montantInfraction,
      nombrePointsRetires: infraction.nombrePointsRetires,
    });

    // Save the archived vehicle to the archive database
    await archivedInfraction.save();

    // Remove the vehicle from the main database
    await infraction.deleteOne();

    res.json({ message: 'Infraction deleted and archived successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  AddInfractions,
  UpdateInfraction,
  FindAllInfractions,
  FindSingleInfractions,
  DeleteInfraction,
  fetchInfractions,
};
