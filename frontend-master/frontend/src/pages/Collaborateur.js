import { Helmet } from 'react-helmet-async';
import {Link as RouterLink } from 'react-router-dom'
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';

import Collab from '../sections/@dashboard/collaborateur/Collab'
import BasicAlerts from 'src/components/Alert/alert1';
import { useState } from 'react';
// mock


// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
 
  return (
    <>
      
      <Helmet>
        <title> Dashboard: Collaborateur  </title>
      </Helmet>

      
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Collaborateur
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} component={RouterLink} to={`http://localhost:3000/dashboard/addCollaborateur`}  >
            Ajouter Collaborateur
          </Button>
        </Stack>
        
        <Collab/>
      
    </>
  );
}
