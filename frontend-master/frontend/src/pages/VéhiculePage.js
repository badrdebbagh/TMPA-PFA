import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Iconify from '../components/iconify';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Container, Typography, Stack, Button } from '@mui/material'; /*   */
// components
import Vehicule from '../sections/@dashboard/Véhicule/Vehicule';

// mock

export default function VéhiculePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Véhicule </title>
      </Helmet>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Véhicule
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          component={RouterLink}
          to={`http://localhost:3000/dashboard/addvehicule`}
        >
          Ajouter Véhicule
        </Button>
      </Stack>

      <Vehicule />
    </>
  );
}
