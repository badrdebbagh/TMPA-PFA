const VehiculeModel = require('../models/Véhicule');
const ArchivedVehicule = require('../models/ArchivedVehicules');
const ValidateVehicule = require('../Validation/VehiculeValidation');

const excelJS = require('exceljs');

//add work
const AddVehicule = async (req, res) => {
  const { errors, isValid } = ValidateVehicule(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      await VehiculeModel.findOne({ WW: req.body.WW }).then(async (exist) => {
        if (exist) {
          errors.WW = 'Vehicule Exist';
          res.status(404).json(errors);
        } else {
          await VehiculeModel.create(req.body);
          /* const collab = req.body;
          const newcollab= new CollabModel(collab);
          await newcollab.save();
          res.json(collab) */
          res.status(201).json({ message: 'Vehicule added with success' });
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
//find all work
const FindAllVehicule = async (req, res) => {
  try {
    const data = await VehiculeModel.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};
// find one work
const FindSinglVehicule = async (req, res) => {
  try {
    const data = await VehiculeModel.findOne({ _id: req.params.id });
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};
//Update user
const UpdateVehicule = async (req, res) => {
  const { errors, isValid } = ValidateVehicule(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const data = await VehiculeModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      /*  res.status(201).json(data); */
      res
        .status(201)
        .json({ message: 'Vehicule Updated with success', data: data });
    }
  } catch (error) {
    console.log(error.message);
  }
};
// delete work
const DeleteVehicule = async (req, res) => {
  try {
    const vehicle = await VehiculeModel.findById(req.params.id);

    // Check if the vehicle exists
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Create a new archived vehicle object with the data from the original vehicle
    const archivedVehicle = new ArchivedVehicule({
      Num_parc: vehicle.Num_parc,
      WW: vehicle.WW,
      Num_Chassis: vehicle.Num_Chassis,
      DM_Circulation: vehicle.DM_Circulation,
      Pf: vehicle.Pf,
      Num_Immat: vehicle.Num_Immat,
      Marque: vehicle.Marque,
      Couleur: vehicle.Couleur,
      Prestataire: vehicle.Prestataire,
      Font_Service: vehicle.Font_Service,
      Ref_Pneus: vehicle.Ref_Pneus,
      Echeance_Aut_Circulation: vehicle.Echeance_Aut_Circulation,
      Echaence_Visite_Tech: vehicle.Echaence_Visite_Tech,
      Assurance_Contrat_Cours: vehicle.Assurance_Contrat_Cours,
      Cartes_Verte: vehicle.Cartes_Verte,
      Vignete: vehicle.Vignete,
      Collaborateur: vehicle.Collaborateur,
    });

    // Save the archived vehicle to the archive database
    await archivedVehicle.save();

    // Remove the vehicle from the main database
    await vehicle.deleteOne();

    res.json({ message: 'Vehicle deleted and archived successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
//fetch data
const fetchVehicles = async () => {
  try {
    const vehiculesCollection = db.collection('vehicules'); // Remplacez par le nom de votre collection
    const vehicles = await vehiculesCollection.find().toArray();
    return vehicles;
  } catch (error) {
    console.error('Error fetching vehicules:', error);
    throw error;
  }
};

// export users data
// const exportUsers = async (req, res) => {
//   try {
//     const workbook = new excelJS.Workbook(); // create new workbook
//     const worksheet = workbook.addWorksheet('vehicules'); // add worksheet to workbook

//     worksheet.columns = [
//       {
//         header: 'V no.',
//         key: 'v_no',
//       },
//       {
//         header: 'Num_parc',
//         key: 'num_parc',
//       },
//       {
//         header: 'WW',
//         key: 'ww',
//       },
//       {
//         header: 'DM_Circulation',
//         key: 'dd_circulation',
//       },
//       {
//         header: 'Pf',
//         key: 'pf',
//       },
//       {
//         header: 'Num_Immat',
//         key: 'num_Immat',
//       },
//       {
//         header: 'Marque',
//         key: 'marque',
//       },
//       {
//         header: 'Couleur',
//         key: 'couleur',
//       },
//       {
//         header: 'Prestataire',
//         key: 'prestataire',
//       },
//       {
//         header: 'Font_Service',
//         key: 'font_Service',
//       },
//       {
//         header: 'Ref_Pneus',
//         key: 'ref_Pneus',
//       },
//       {
//         header: 'Echeance_Aut_Circulation',
//         key: 'echeance_aut_circulation',
//       },
//       {
//         header: 'Echaence_Visite_Tech',
//         key: 'echaence_visite_tech',
//       },
//       {
//         header: 'Assurance_Contrat_Cours',
//         key: 'assurance_contrat_cours',
//       },
//       {
//         header: 'Cartes_Verte',
//         key: 'cartes_verte',
//       },
//       {
//         header: 'Vignete',
//         key: 'vignete',
//       },
//     ];

//     let counter = 1;
//     const vehiculesData = await Vehicule.find();

//     // Write data to the worksheet
//     vehiculesData.forEach((vehicule) => {
//       vehicule.v_no = counter;
//       worksheet.addRow(vehicule);
//       counter++;
//     });
//     worksheet.getRow(1).eachCell((cell) => {
//       cell.font = { bold: true };
//     });

//     res.setHeader(
//       'Content-Type',
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     );
//     res.setHeader('Content-Disposition', 'attachment; filename=vehicules.xlsx');
//     await workbook.xlsx.write(res);
//     return res.status(200);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

module.exports = {
  AddVehicule,
  FindAllVehicule,
  FindSinglVehicule,
  UpdateVehicule,
  DeleteVehicule,
  fetchVehicles,
};
