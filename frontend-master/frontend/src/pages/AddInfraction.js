import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import { Link as RouterLink } from 'react-router-dom';
import { Stack, Button } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { useState } from 'react';
import BasicAlerts from 'src/components/Alert/alert1';

export default function ValidationTextFields() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post('http://localhost:3001/api/collab', form)
  //     .then((res) => {
  //       setMessage(res.data.message);
  //       /* hide form after save */
  //       setForm({});
  //       setErrors({});
  //     })
  //     .catch((err) => setErrors(err.response.data));
  // };
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  /* function onChange(event) {
    if (event.target && event.target.value) {
      // Accéder à la propriété "value" uniquement si la variable est définie
      const value = event.target.value;
      // Autres actions à effectuer avec la valeur
    }
  } */

  const [declarationAuteur, setDeclarationAuteur] = useState([]);
  const [numeroDeclaration, setNumeroDeclaration] = useState([]);
  const [immatriculationVehicule, setImmatriculationVehicule] = useState([]);
  const [dateHeureInfraction, setDateHeureInfraction] = useState([]);
  const [lieuInfraction, setLieuInfraction] = useState([]);
  const [excesDeVitesse, setExcesDeVitesse] = useState([]);
  const [vitesseEnregistree, setVitesseEnregistree] = useState([]);
  const [vitesseAutorisee, setVitesseAutorisee] = useState([]);
  const [dateConstatation, setDateConstatation] = useState([]);
  const [montantInfraction, setMontantInfraction] = useState([]);
  const [nombrePointsRetires, setNombrePointsRetires] = useState([]);

  const handleDate3Change = (date) => {
    setDateConstatation(date);
  };

  const handleDateHeureChange = (date) => {
    setDateHeureInfraction(date);
  };
  const CreateUser = () => {
    axios
      .post('http://localhost:3001/api/Infractions', {
        declarationAuteur,
        numeroDeclaration,
        immatriculationVehicule,
        dateHeureInfraction,
        lieuInfraction,
        excesDeVitesse,
        vitesseEnregistree,
        vitesseAutorisee,
        dateConstatation,
        montantInfraction,
        nombrePointsRetires,
      })
      .then((res) => {
        console.log(res.data);
        setForm({});
        setErrors({});
        setMessage(res.data.message);
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
      })
      .catch((err) => setErrors(err.response.data));
  };

  return (
    <>
      <BasicAlerts message={message} show={show} />
      <div component="form">
        {' '}
        {/* onSubmit={onSubmitHandler} */}
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            className="form-control"
            label="declarationAuteur"
            variant="outlined"
            style={{ marginBottom: '16px' }}
            onChangeHandler={onChangeHandler}
            onChange={(e) => setDeclarationAuteur(e.target.value)}
            error={errors.declarationAuteur}
            helperText={
              errors.declarationAuteur ? <>{errors.declarationAuteur}</> : 'Veulliez Entrer Votre declarationAuteur'
            }
          />
          <TextField
            className="form-control"
            label="numeroDeclaration"
            variant="outlined"
            style={{ marginBottom: '16px' }}
            onChangeHandler={onChangeHandler}
            onChange={(e) => setNumeroDeclaration(e.target.value)}
            error={errors.numeroDeclaration}
            helperText={
              errors.numeroDeclaration ? <>{errors.numeroDeclaration}</> : 'Veulliez Entrer numero de déclaration'
            }
          />

          <TextField
            className="form-control"
            label="immatriculationVehicule"
            variant="outlined"
            style={{ marginBottom: '16px' }}
            onChangeHandler={onChangeHandler}
            onChange={(e) => setImmatriculationVehicule(e.target.value)}
            error={errors.immatriculationVehicule}
            helperText={
              errors.immatriculationVehicule ? (
                <>{errors.immatriculationVehicule}</>
              ) : (
                'Veulliez Entrer immatriculation du véhicule'
              )
            }
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                className="form-control"
                label="dateHeureInfraction"
                style={{ marginBottom: '16px' }}
                variant="outlined"
                value={dateHeureInfraction}
                onChange={handleDateHeureChange} // Add the handler to update dateHeureInfraction state
                error={errors.dateHeureInfraction}
                slotProps={{
                  textField: {
                    helperText: errors.dateHeureInfraction ? (
                      <>{errors.dateHeureInfraction}</>
                    ) : (
                      'Veulliez Entrer dateHeureInfraction'
                    ),
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            className="form-control"
            label="lieuInfraction"
            variant="outlined"
            style={{ marginBottom: '16px' }}
            onChangeHandler={onChangeHandler}
            onChange={(e) => setLieuInfraction(e.target.value)}
            error={errors.lieuInfraction}
            helperText={
              errors.lieuInfraction ? <>{errors.lieuInfraction}</> : "Veulliez Entrer le lieu de l'Infraction"
            }
          />
          <TextField
            className="form-control"
            label="excesDeVitesse"
            variant="outlined"
            style={{ marginBottom: '16px' }}
            onChangeHandler={onChangeHandler}
            onChange={(e) => setExcesDeVitesse(e.target.value)}
            error={errors.excesDeVitesse}
            helperText={errors.excesDeVitesse ? <>{errors.excesDeVitesse}</> : "Veulliez Entrer l'exces de vitesse"}
          />
          <TextField
            className="form-control"
            label="vitesseEnregistree"
            variant="outlined"
            style={{ marginBottom: '16px' }}
            onChangeHandler={onChangeHandler}
            onChange={(e) => setVitesseEnregistree(e.target.value)}
            error={errors.vitesseEnregistree}
            helperText={
              errors.vitesseEnregistree ? <>{errors.vitesseEnregistree}</> : 'Veulliez Entrer la vitesse enregistrée'
            }
          />
          <TextField
            className="form-control"
            label="vitesseAutorisee"
            variant="outlined"
            style={{ marginBottom: '16px' }}
            onChangeHandler={onChangeHandler}
            onChange={(e) => setVitesseAutorisee(e.target.value)}
            error={errors.vitesseAutorisee}
            helperText={
              errors.vitesseAutorisee ? <>{errors.vitesseAutorisee}</> : 'Veulliez Entrer la vitesse autorisée'
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                className="form-control"
                label="dateConstatation"
                style={{ marginBottom: '16px' }}
                variant="outlined"
                onChangeHandler={onChangeHandler}
                value={dateConstatation}
                onChange={handleDate3Change}
                error={errors.dateConstatation}
                slotProps={{
                  textField: {
                    helperText: errors.dateConstatation ? (
                      <>{errors.dateConstatation}</>
                    ) : (
                      'Veulliez Entrer la date de constatation'
                    ),
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <TextField
                className="form-control"
                label="montantInfraction"
                variant="outlined"
                style={{ marginBottom: '16px' }}
                onChangeHandler={onChangeHandler}
                onChange={(e) => setMontantInfraction(e.target.value)}
                error={errors.montantInfraction}
                helperText={
                  errors.montantInfraction ? (
                    <>{errors.montantInfraction}</>
                  ) : (
                    "Veulliez Entrer le montant de l'infraction"
                  )
                }
              />
              <TextField
                className="form-control"
                label="nombrePointsRetires"
                variant="outlined"
                style={{ marginBottom: '16px' }}
                onChangeHandler={onChangeHandler}
                onChange={(e) => setNombrePointsRetires(e.target.value)}
                error={errors.nombrePointsRetires}
                helperText={
                  errors.nombrePointsRetires ? (
                    <>{errors.nombrePointsRetires}</>
                  ) : (
                    'Veulliez Entrer le nombre de points retitrés'
                  )
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </div>
      <Stack direction="row" spacing={2}>
        {/*  onSubmit={onSubmitHandler} */}
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={CreateUser} /* component={RouterLink} to={`http://localhost:3000/dashboard/collaborateur`}  */
        >
          Ajouter Infraction
        </Button>
        <Button variant="contained" component={RouterLink} to="/dashboard/Infractions">
          Annuler
        </Button>
      </Stack>
    </>
  );
}
