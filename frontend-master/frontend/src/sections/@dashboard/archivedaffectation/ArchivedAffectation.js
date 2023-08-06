import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, TextField, Stack } from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/material';
import TableArchivedAffectation from 'src/sections/tableArchivedAffectation/TableArchivedAffectation';

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
      .post('http://localhost:3001/api/archived-affectation', {
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

  fetch('http://localhost:3001/api/archived-affectation') // Remplacez '/affectation' par l'URL correcte de votre backend
    .then((response) => response.json())
    .then((data) => {
      console.table(data);
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <>
      <TableArchivedAffectation />
    </>
  );
};

export default Affectations;
