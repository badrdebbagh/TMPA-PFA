import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Iconify from '../components/iconify';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Container, Typography, Stack, Button } from '@mui/material'; /*   */
// components
import Infractions from '../sections/@dashboard/Infractions/Infractions';

// mock

export default function InfractionsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Infractions </title>
      </Helmet>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Infractions
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          component={RouterLink}
          to={`http://localhost:3000/dashboard/addinfraction`}
        >
          Ajouter Infraction
        </Button>
      </Stack>

      <Infractions />
    </>
  );
}
