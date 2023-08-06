
const CollabModel = require("../models/Collaborateur");
const Vehicule = require("../models/Véhicule")
const ValidateCollab = require("../Validation/CollaborateurValidation")
//add work 
const AddCollab = async (req, res) => {
    
  const { errors, isValid } = ValidateCollab(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      await CollabModel.findOne({ Email: req.body.Email }).then(async (exist) => {
        if (exist) {
          errors.Email = "User Exist";
          res.status(404).json(errors);
        } else {
          await CollabModel.create(req.body);
          /* const collab = req.body;
          const newcollab= new CollabModel(collab);
          await newcollab.save();
          res.json(collab) */
          res.status(201).json({ message: "Collaborateur added with success" });
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
//find all work 
const FindAllCollab = async (req, res) => {
  try {
      const data = await CollabModel.find();
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
   
};
// find one work 
const FindSinglCollab = async (req, res) => {
  try {
      const data = await CollabModel.findOne({ _id: req.params.id });
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
};
//Update user
const UpdateCollab = async (req, res) => {
  const { errors, isValid } = ValidateCollab(req.body);
try {
  if (!isValid) {
    res.status(404).json(errors);
  } else {
    const data = await CollabModel.findOneAndUpdate(
      { _id: req.params.id },
         req.body,
      { new: true }
    );            
   /*  res.status(201).json(data); */
    res.status(201).json({ message: "Collaborateur Updated with success",
    data: data });
  }
} catch (error) {
  console.log(error.message);
  
}
};
// delete work 
const DeleteCollab = async (req, res) => {
  try {
      await CollabModel.deleteOne({ _id: req.params.id });
      res.status(201).json({ message: "User deleted with success" });
    } catch (error) {
      console.log(error.message);
    }
};

/* ùùùùùùùù */


 
module.exports = {
  AddCollab,
  FindAllCollab,
  FindSinglCollab,
  UpdateCollab,
  DeleteCollab,

  
};
