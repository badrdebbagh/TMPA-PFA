import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Iconify from '../components/iconify';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Container, Typography, Stack, Button } from '@mui/material'; /*   */
// components
import ArchivedVehicule from '../sections/@dashboard/ArchivedVehicles/ArchivedVehicule';

// mock

export default function ArchivedVéhiculePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Véhicule Archivee </title>
      </Helmet>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Véhicule
        </Typography>
        {/* <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          component={RouterLink}
          to={`http://localhost:3000/dashboard/archived-vehicule`}
        >
          Ajouter Véhicule
        </Button> */}
      </Stack>

      <ArchivedVehicule />
    </>
  );
}
