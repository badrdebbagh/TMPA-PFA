import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts({message , show}) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2} style ={{display : show ? "block" : "none"}}  >
      {/* <Alert severity="error">This is an error alert — check it out!</Alert>
      <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert> */}
      <Alert severity="success">{message}</Alert>
    </Stack>
  );
}