/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */ 

import { Stack, Typography } from '@mui/material';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import Affectation from 'src/sections/@dashboard/affectation/Affectation';


 



export default function affectation() {


  return (
    <>
      <Helmet>
        <title> Dashboard: Affectation  </title>
      </Helmet>

      
        <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
          <Typography variant="h4" gutterBottom>
            Affectation d'un vehicule a un collaborateur
          </Typography>
          
        </Stack>

        <Affectation />
   
     
    </>
  );

}


