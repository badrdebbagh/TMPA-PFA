import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, TextField, Stack } from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/material';
import TableAffectation from 'src/sections/tableAffectation/TableAffectation';
import { Link as RouterLink } from 'react-router-dom';

const Affectations = () => {
  const [collaborateurs, setCollaborateurs] = useState([]);
  const [vehicules, setVehicules] = useState([]);
  /*  */
  const [collaborateurId, setCollaborateursId] = useState([]);
  const [vehiculeId, setVehiculesId] = useState([]);

  useEffect(() => {
    // Effectuez une requête GET pour récupérer les collaborateurs depuis le backend
    axios
      .get('http://localhost:3001/api/collab')
      .then((response) => {
        setCollaborateurs(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des collaborateurs:', error);
      });

    // Effectuez une requête GET pour récupérer les véhicules depuis le backend
    axios
      .get('http://localhost:3001/api/vehicule')
      .then((response) => {
        setVehicules(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des véhicules:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Effectuez une requête POST vers le backend
    axios
      .post('http://localhost:3001/api/affectation', {
        collaborateurId,
        vehiculeId,
      })
      .then((response) => {
        // Gérer la réponse du backend après la création réussie
        console.log('Affectation créée avec succès');
      })
      .catch((error) => {
        console.error("Erreur lors de la création de l'affectation:", error);
      });
  };

  fetch('http://localhost:3001/api/affectation') // Remplacez '/affectation' par l'URL correcte de votre backend
    .then((response) => response.json())
    .then((data) => {
      console.table(data);
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl>
              <TextField
                select
                label="collaborateur"
                labelId="collaborateur-label"
                id="collaborateur"
                onChange={(e) => setCollaborateursId(e.target.value)}
                name="collaborateurId" // Ajoutez l'attribut name ici
                style={{ width: '300px', marginBottom: '16px' }}
              >
                {collaborateurs.map((collaborateur) => (
                  <MenuItem key={collaborateur._id} value={collaborateur._id}>
                    {collaborateur.Nom}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            <FormControl>
              <TextField
                select
                label="Véhicule"
                labelId="vehicule-label"
                id="vehicule"
                onChange={(e) => setVehiculesId(e.target.value)}
                name="vehiculeId" // Ajoutez l'attribut name ici
                style={{ width: '300px' }}
              >
                {vehicules.map((vehicule) => (
                  <MenuItem key={vehicule._id} value={vehicule._id}>
                    {`${vehicule.Marque} - ${vehicule.WW}`}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            {/* <Stack direction="row" spacing={2} > */}

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ justifyContent: 'space-around', height: '54px', width: '200px', marginTop: '0.5%' }}
            >
              Affecter
            </Button>
            {/* </Stack> */}
          </Box>
        </form>
      </div>
      <TableAffectation />
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="http://localhost:3000/dashboard/archived-affectation"
      >
        Go to Archived Affectations
      </Button>
    </>
  );
};

export default Affectations;
