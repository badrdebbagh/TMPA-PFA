const UserModel = require('../models/Users');
const Users = require('../models/Users');
const ValidateUser = require('../Validation/UserValidation');
const Validatelogin = require('../Validation/login');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const VehiculeModel = require('../models/Véhicule');
const CollabModel = require('../models/Collaborateur');

/* add work */

const ADMIN_USER_ID = '645d248a84b5d1e60dfb9fe1';
const AddUser = async (req, res) => {
  const { errors, isValid } = ValidateUser(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      await Users.findOne({ email: req.body.email }).then(async (exist) => {
        if (exist) {
          errors.email = 'User Exist';
          res.status(404).json(errors);
        } else {
          /* await Users.create(req.body); */
          const hash = bcrypt.hashSync(req.body.password, 10); //hashed password
          req.body.password = hash;
          const user = req.body;
          const newUser = new Users(user);
          await newUser.save();
          /* res.json(user)  */
          res.status(201).json({ message: 'User added with success' });
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
/* find all work */
const FindAllUsers = async (req, res) => {
  try {
    const data = await Users.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const saveColumnPreferences = async (req, res) => {
  const userId = ADMIN_USER_ID;
  const { selectedColumns } = req.body;

  try {
    // Find the user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    // Update the selectedColumns field with the new preferences
    user.selectedColumns = selectedColumns;

    // Save the user document
    await user.save();

    res.status(200).json({ message: 'Column preferences saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving column preferences' });
  }
};
/* find one work */
const FindSinglUser = async (req, res) => {
  try {
    const data = await Users.findOne({ _id: req.params.id });
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};
//Update user
const UpdateUser = async (req, res) => {
  const { errors, isValid } = ValidateUser(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const data = await Users.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json(data);
    }
  } catch (error) {
    console.log(error.message);
  }
};
/* delete work */
const DeleteUser = async (req, res) => {
  try {
    await Users.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: 'User deleted with success' });
  } catch (error) {
    console.log(error.message);
  }
};
/* login */
const loginHandler = async (req, res) => {
  const { errors, isValid } = Validatelogin(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
          errors.email = 'not found user';
          res.status(404).json(errors);
        } else {
          bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if (!isMatch) {
              errors.password = 'incorrect password';
              res.status(404).json(errors);
            } else {
              var token = jwt.sign(
                {
                  id: user._id,
                  lastname: user.lastname,
                  firstname: user.firstname,
                  email: user.email,
                  phone: user.phone,
                },
                process.env.PRIVATE_KEY,
                { expiresIn: '6s' }
              );
              res.status(200).json({
                message: 'success',
                token: 'Bearer ' + token,
              });
            }
          });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};
// Create admin automatique
const createAdmin = async () => {
  try {
    const adminData = {
      phone: '0123456789',
      email: 'admin@tanger.med',
      firstname: 'Admin',
      lastname: 'User',
      password: 'admintmpa',
    };

    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    adminData.password = hashedPassword;

    const filter = { email: adminData.email };
    const update = { $set: adminData };
    const options = { upsert: true, new: true };

    const updatedAdmin = await UserModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (updatedAdmin) {
      console.log('Admin user created/updated successfully');
      return updatedAdmin;
    } else {
      console.log('Failed to create/update admin user');
    }
  } catch (error) {
    console.error('Error creating/updating admin user:', error);
  }
};

module.exports = {
  AddUser,
  FindAllUsers,
  FindSinglUser,
  UpdateUser,
  DeleteUser,
  loginHandler,
  createAdmin,
  saveColumnPreferences,
};

/* 
const Users = require("../models/Users");
const ValidateUser = require("../Validation/UserValidation");


/* add work 
const AddUser = async (req, res) => {
    
  const { errors, isValid } = ValidateUser(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      await Users.findOne({ email: req.body.email }).then(async (exist) => {
        if (exist) {
          errors.email = "User Exist";
          res.status(404).json(errors);
        } else {
          /* await Users.create(req.body); 
          const user = req.body;
          const newUser= new Users(user);
           await newUser.save();
           res.json(user)
          res.status(201).json({ message: "User added with success" });
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
/* find all work 
const FindAllUsers = async (req, res) => {
  try {
      const data = await Users.find();
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
   
};
/* find one work 
const FindSinglUser = async (req, res) => {
  try {
      const data = await Users.findOne({ _id: req.params.id });
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
};
//Update user
const UpdateUser = async (req, res) => {
  const { errors, isValid } = ValidateUser(req.body);
try {
  if (!isValid) {
    res.status(404).json(errors);
  } else {
    const data = await Users.findOneAndUpdate(
      { _id: req.params.id },
         req.body,
      { new: true }
    );
    res.status(201).json(data);
  }
} catch (error) {
  console.log(error.message);
}
};
/* delete work 
const DeleteUser = async (req, res) => {
  try {
      await Users.deleteOne({ _id: req.params.id });
      res.status(201).json({ message: "User deleted with success" });
    } catch (error) {
      console.log(error.message);
    }
};
/* login 
const loginHandler = async (req, res) => {
const { email, password } = req.body;
const users = await Users.findOne({ email: email });
if (!users || users.password !== password) {
res.status(401).json({ status: "error", message: "Invalid email or password" });
} else {
res.json({ status: "success", message: "Login Successful", data: { users } });
}
};


module.exports = {
AddUser,
FindAllUsers,
FindSinglUser,
UpdateUser,
DeleteUser,
loginHandler,
};
*/
