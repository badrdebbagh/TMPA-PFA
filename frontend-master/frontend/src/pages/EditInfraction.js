import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import { Navigate, Link as RouterLink, useParams } from 'react-router-dom';
import { Stack, Button, FormControl } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { useState, useEffect } from 'react';
import BasicAlerts from 'src/components/Alert/alert1';

export default function ValidationTextFields() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const [infractions, setInfractions] = useState({});
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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const updateInfraction = {
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
    };
    axios
      .put(`http://localhost:3001/api/Infractions/${id}`, updateInfraction)
      .then((res) => {
        console.log(res.data);
        setInfractions({});
        setErrors({});
        setMessage(res.data.message);
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
        Navigate('http://localhost:3000/dashboard/Infractions');
      })
      .catch((err) => {
        const errorMessage = err.response?.data ?? 'Une erreur s est produite.';
        setErrors(errorMessage);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/Infractions/${id}`)
      .then((res) => {
        const {
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
        } = res.data;

        setDeclarationAuteur(declarationAuteur);
        setNumeroDeclaration(numeroDeclaration);
        setImmatriculationVehicule(immatriculationVehicule);
        setDateHeureInfraction(dateHeureInfraction);
        setLieuInfraction(lieuInfraction);
        setExcesDeVitesse(excesDeVitesse);
        setVitesseEnregistree(vitesseEnregistree);
        setVitesseAutorisee(vitesseAutorisee);
        setDateConstatation(dateConstatation);
        setMontantInfraction(montantInfraction);
        setNombrePointsRetires(nombrePointsRetires);

        setInfractions(res.data);
      })
      .catch((err) => {
        // Gérez les erreurs de requête ici
      });
  }, []);

  const handleDate3Change = (date) => {
    setDateConstatation(date);
  };

  const handleDateHeureChange = (date) => {
    setDateHeureInfraction(date);
  };

  return (
    <>
      <BasicAlerts message={message} show={show} />

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          focused
          className="form-control"
          label="declarationAuteur"
          variant="outlined"
          style={{ marginBottom: '16px' }}
          // onChangeHandler={onChangeHandler}

          onChange={(e) => setDeclarationAuteur(e.target.value)}
          value={declarationAuteur}
          error={errors.declarationAuteur}
          helperText={
            errors.declarationAuteur ? <>{errors.declarationAuteur}</> : 'Veulliez Entrer Votre declarationAuteur'
          }
        />
        <TextField
          focused
          className="form-control"
          label="numeroDeclaration"
          variant="outlined"
          style={{ marginBottom: '16px' }}
          // onChangeHandler={onChangeHandler}
          onChange={(e) => setNumeroDeclaration(e.target.value)}
          value={numeroDeclaration}
          error={errors.numeroDeclaration}
          helperText={
            errors.numeroDeclaration ? <>{errors.numeroDeclaration}</> : 'Veulliez Entrer numero de déclaration'
          }
        />

        <TextField
          focused
          className="form-control"
          label="immatriculationVehicule"
          variant="outlined"
          style={{ marginBottom: '16px' }}
          // onChangeHandler={onChangeHandler}
          onChange={(e) => setImmatriculationVehicule(e.target.value)}
          value={immatriculationVehicule}
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
              onChange={handleDateHeureChange}
              // Add the handler to update dateHeureInfraction state
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
          focused
          className="form-control"
          label="lieuInfraction"
          variant="outlined"
          style={{ marginBottom: '16px' }}
          // onChangeHandler={onChangeHandler}
          onChange={(e) => setLieuInfraction(e.target.value)}
          value={lieuInfraction}
          error={errors.lieuInfraction}
          helperText={errors.lieuInfraction ? <>{errors.lieuInfraction}</> : "Veulliez Entrer le lieu de l'Infraction"}
        />
        <TextField
          focused
          className="form-control"
          label="excesDeVitesse"
          variant="outlined"
          style={{ marginBottom: '16px' }}
          // onChangeHandler={onChangeHandler}
          onChange={(e) => setExcesDeVitesse(e.target.value)}
          value={excesDeVitesse}
          error={errors.excesDeVitesse}
          helperText={errors.excesDeVitesse ? <>{errors.excesDeVitesse}</> : "Veulliez Entrer l'exces de vitesse"}
        />
        <TextField
          focused
          className="form-control"
          label="vitesseEnregistree"
          variant="outlined"
          style={{ marginBottom: '16px' }}
          // onChangeHandler={onChangeHandler}
          onChange={(e) => setVitesseEnregistree(e.target.value)}
          value={vitesseEnregistree}
          error={errors.vitesseEnregistree}
          helperText={
            errors.vitesseEnregistree ? <>{errors.vitesseEnregistree}</> : 'Veulliez Entrer la vitesse enregistrée'
          }
        />
        <TextField
          focused
          className="form-control"
          label="vitesseAutorisee"
          variant="outlined"
          style={{ marginBottom: '16px' }}
          // onChangeHandler={onChangeHandler}
          onChange={(e) => setVitesseAutorisee(e.target.value)}
          value={vitesseAutorisee}
          error={errors.vitesseAutorisee}
          helperText={errors.vitesseAutorisee ? <>{errors.vitesseAutorisee}</> : 'Veulliez Entrer la vitesse autorisée'}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              className="form-control"
              label="dateConstatation"
              style={{ marginBottom: '16px' }}
              variant="outlined"
              // onChangeHandler={onChangeHandler}

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
              focused
              className="form-control"
              label="montantInfraction"
              variant="outlined"
              style={{ marginBottom: '16px' }}
              // onChangeHandler={onChangeHandler}
              onChange={(e) => setMontantInfraction(e.target.value)}
              value={montantInfraction}
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
              focused
              className="form-control"
              label="nombrePointsRetires"
              variant="outlined"
              style={{ marginBottom: '16px' }}
              // onChangeHandler={onChangeHandler}
              onChange={(e) => setNombrePointsRetires(e.target.value)}
              value={nombrePointsRetires}
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
      <Stack direction="row" spacing={2}>
        {/* onClick={CreateUser} */}
        <Button variant="contained" endIcon={<SendIcon />} onClick={onSubmitHandler}>
          Modifier l'infraction
        </Button>
        <Button variant="contained" component={RouterLink} to="/dashboard/Infractions">
          Annuler
        </Button>
      </Stack>
    </>
  );
}
