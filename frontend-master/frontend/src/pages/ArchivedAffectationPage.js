/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { Stack, Typography } from '@mui/material';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import ArchivedAffectation from 'src/sections/@dashboard/archivedaffectation/ArchivedAffectation';

export default function ArchivedAffectationPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: ArchivedAffectation </title>
      </Helmet>

      <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
        <Typography variant="h4" gutterBottom>
          Archived Affectation
        </Typography>
      </Stack>

      <ArchivedAffectation />
    </>
  );
}
