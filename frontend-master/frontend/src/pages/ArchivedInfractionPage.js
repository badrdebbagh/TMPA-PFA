import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Iconify from '../components/iconify';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Container, Typography, Stack, Button } from '@mui/material'; /*   */
// components
import ArchivedInfractions from '../sections/@dashboard/ArchivedInfractions/ArchivedInfractions';

// mock

export default function ArchivedInfractionPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: ArchivedInfractions </title>
      </Helmet>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Archived Infractions
        </Typography>
        {/* <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          component={RouterLink}
          to={`http://localhost:3000/dashboard/archivedInfractions`}
        >
          Ajouter Infraction
        </Button> */}
      </Stack>

      <ArchivedInfractions />
    </>
  );
}
