import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import {Link as RouterLink } from 'react-router-dom';
import { 
    Stack , 
    Button } from '@mui/material';
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
const [message, setMessage] = useState("");
const [show , setShow ] = useState(false) ;
  const onSubmitHandler = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:3001/api/collab', form)
    .then(res=>{
      setMessage(res.data.message)
      /* hide form after save */
      setForm({})
      setErrors({})
    })
    .catch(err=>setErrors(err.response.data))
    
  }
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    
  };
  function onChange(event) {
    if (event.target && event.target.value) {
      // Accéder à la propriété "value" uniquement si la variable est définie
      const value = event.target.value;
      // Autres actions à effectuer avec la valeur
    }
  }
  
  const [Email , setEmail]=useState([]) 
  const [Nom , setNome]=useState([])
  const [Prenom , setPrenom]=useState([])
   const [Filiale , setFiliale]=useState([])
  const [Direction , setDirection]=useState([]) 
  const [Matricule , setMatricule]=useState([]) 
  const [Grade , setGrade]=useState([]) 
  const [NumeroGsm , setNumeroGsm]=useState([])
  const [NumeroGsmPersonnel , setNumeroGsmPersonnel]=useState([])
  const [TelephoneFixe , setTelephoneFixe]=useState([])
  const [Permis , setPermis]=useState([])
  const [CIN , setCIN]=useState([]) 
  const [NumeroPassport , setNumeroPassport]=useState([])
  const [DateValiditePermis , setDateValiditePermis]=useState('')
  const [DateValiditéCIN , setDateValiditéCIN]=useState('')
  const [DateValiditéPassport , setDateValiditéPassport]=useState('')
  const handleDate1Change = (date) => {
    const formattedDate = (date).format('MM/DD/YYYY');
    setDateValiditePermis(formattedDate);
  };

  const handleDate2Change = (date) => {
    const formattedDate = (date).format('MM/DD/YYYY');
    setDateValiditéCIN(formattedDate);
  };

  const handleDate3Change = (date) => {
    const formattedDate = (date).format('MM/DD/YYYY');
    setDateValiditéPassport(formattedDate);
  };

  const CreateUser = ()=>{
    axios.post("http://localhost:3001/api/collab",{   

    Email,
    Nom,
    Prenom,
    Filiale,
    Direction,
    Matricule,
    Grade,
    NumeroGsm,
    NumeroGsmPersonnel,
    TelephoneFixe,
    Permis,
    CIN,
    NumeroPassport,
    DateValiditePermis,
    DateValiditéCIN,
    DateValiditéPassport 
       
   })
   .then(res => {
       console.log(res.data)
       setForm({})
       setErrors({})
       setMessage(res.data.message)
       setShow(true)
       setTimeout(()=>{
        setShow(false)
       },4000);
   })
   .catch((err)=>setErrors(err.response.data))
   
 }

    const Filiale1 = [
        {
          value: 'TMPA',
          label:'TMPA',
        },
        {
          value: 'TMSA',
          label: 'TMSA',
        },
        {
          value: 'TME',
          label: 'TME',
        },
        {
          value: 'MEDHUB',
          label: 'MEDHUB',
        },
        {
            value: 'CTHZF',
            label: 'CTHFZ',
        },
        {
            value: 'TFZ',
            label: 'TFZ',
        },
        {
            value: 'CIRES',
            label: 'CIRES',
        },
        {
            value: 'FTM',
            label: 'FTM',
        },
        {
            value: 'TMU',
            label: 'TMU',
        },
        {
            value: 'TM2',
            label: 'TM2',
        },
      ];
const Direction1 = [
        {
          value: 'AUDIT INTERNE',
          label:'AUDIT INTERNE',
        },
        {
          value: 'Direction Opérations Import/Export  (DOIX)',
          label: 'Direction Opérations Import/Export  (DOIX)',
        },
        {
          value: 'Juridique et Foncier',
          label: 'Juridique et Foncier',
        },
        {
          value: 'Direction Opérations DAF (Import/Export)',
          label: 'Direction Opérations DAF (Import/Export)',
        },
        {
            value: 'TRAVAUX',
            label: 'TRAVAUX',
        },
        {
            value: 'BU ZA LOGISTIQUE',
            label: 'BU ZA LOGISTIQUE',
        },
        {
            value: 'Port Passager',
            label: 'Port Passager',
        },
        {
            value: 'Commerciale',
            label: 'Commerciale',
        },
        {
            value: 'Direction des Opérations Maritimes',
            label: 'Direction des Opérations Maritimes',
        },
        {
            value: 'Direction Commerciale',
            label: 'Direction Commerciale',
        },
        {
            value: 'TECHNIQUE',
            label: 'TECHNIQUE',
        },
        {
            value: 'Management de la Performance',
            label: 'Management de la Performance',
        },
        {
            value: 'Direction Administrative et Financière',
            label: 'Direction Administrative et Financière',
        },
        {
            value: 'Direction Centrale Pilotage',
            label: 'Direction Centrale Pilotage',
        },
        {
            value: 'Projet NWM',
            label: 'Projet NWM',
        },
        {
            value: 'Etudes et Intégration',
            label: 'Etudes et Intégration',
        },
        {
            value: 'Administration',
            label: 'Administration',
        },
        {
            value: 'Administration, Finance et SI',
            label: 'Administration, Finance et SI',
        },
        {
            value: 'Commercial/Achat',
            label: 'Commercial/Achat',
        },
        {
            value: 'Communication et relations institutionnelles',
            label: 'Communication et relations institutionnelles',
        },
        {
            value: 'Conseil de Surveillance',
            label: 'Conseil de Surveillance',
        },
        {
            value: 'Département Achats',
            label: 'Département Achats',
        },
        {
            value: 'Dir. Dév. International',
            label: 'Dir. Dév. International',
        },
        {
            value: 'Dir. Générale',
            label: 'Dir. Générale',
        },
        {
            value: 'Direction Centrale Capitainerie',
            label: 'Direction Centrale Capitainerie',
        },
        {
            value: 'Direction Centrale Support de TMPA',
            label: 'Direction Centrale Support de TMPA',
        },
        {
            value: 'Direction des Achats',
            label: 'Direction des Achats',
        },
        {
            value: 'Direction Generale',
            label: 'Direction Generale',
        },
        {
            value: 'Direction générale TM2',
            label: 'Direction générale TM2',
        },
        {
            value: 'Direction Relations Eses Marketing et Communication',
            label: 'Direction Relations Eses Marketing et Communication',
        },
        {
            value: 'Direction Support',
            label: 'Direction Support',
        },
        {
            value: 'Direction Sûreté-Sécurité',
            label: 'Direction Sûreté-Sécurité',
        },
        {
            value: 'Eau',
            label: 'Eau',
        },
        {
            value: 'Electricité',
            label: 'Electricité',
        },
        {
            value: 'Fondation',
            label: 'Fondation',
        },
        {
            value: 'FONDATION (Centre Payeur TMSA)',
            label: 'FONDATION (Centre Payeur TMSA)',
        },
        {
            value: 'Gestion Projets Portuaires Maritimes',
            label: 'Gestion Projets Portuaires Maritimes',
        },
        {
            value: 'Maintenance facilities',
            label: 'Maintenance facilities',
        },
        {
            value: 'Pilotage TM2',
            label: 'Pilotage TM2',
        },
        {
            value: 'QHSE',
            label: 'QHSE',
        },
        {
            value: 'Service Contrôle Interne',
            label: 'Service Contrôle Interne',
        },
        {
            value: 'Service Moyens Généraux',
            label: 'Service Moyens Généraux',
        },
        {
            value: 'Service Secrétariat des Conseils',
            label: 'Service Secrétariat des Conseils',
        },
        {
            value: 'Stratégie et développement',
            label: 'Stratégie et développement',
        },
        {
            value: 'Support et Développement',
            label: 'Support et Développement',
        },
        {
            value: 'Tanger Med Port Center',
            label: 'Tanger Med Port Center',
        },
        {
            value: 'TM1',
            label: 'TM1',
        },
        {
            value: 'TM2',
            label: 'TM2',
        },
      ];
  return (
    <>
    <BasicAlerts message={message} show ={show} />
    <div component="form" > {/* onSubmit={onSubmitHandler} */}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
      {/*   <div component="form" onSubmit={onSubmitHandler}> */}
          <TextField
            className="form-control"
            label="Nom"
            variant="outlined"
            style={{ marginBottom: '16px' }}
            onChangeHandler={onChangeHandler}
            onChange={e => setNome(e.target.value)}
            error={errors.Nom}
            helperText={errors.Nom ? <>{errors.Nom}</>: 'Veulliez Entrer Votre Nom'}
             />
          <TextField
            className="form-control"
            label="Prenom"
            variant="outlined"
            style={{ marginBottom: '16px' }}
            onChangeHandler={onChangeHandler}
            onChange={e => setPrenom(e.target.value)} 
            error={errors.Prenom}
            helperText={errors.Prenom ? <>{errors.Prenom}</>: 'Veulliez Entrer Votre Prénom'}/>
          <TextField
          className="form-control"
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue=""   
            onChangeHandler={onChangeHandler}
            onChange={e => setFiliale(e.target.value)}
            error={errors.Filiale}
            helperText={errors.Filiale ? <>{errors.Filiale}</>: 'Veulliez Entrer Votre Filiale'}
          >
            {Filiale1.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
          className="form-control"
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue=""
            onChangeHandler={onChangeHandler}
            onChange={e => setDirection(e.target.value)}
            error={errors.Direction}
            helperText={errors.Direction ? <>{errors.Direction}</>: 'Veulliez Entrer Votre Direction'}
          >
            {Direction1.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        {/* </div> */}
        {/* <div component="form" onSubmit={onSubmitHandler}> */}
          <TextField
            className="form-control"
            label="Matricule"
            variant="outlined"
            style={{ marginBottom: '16px' }}
            onChangeHandler={onChangeHandler}
            onChange={e => setMatricule(e.target.value)} 
            error={errors.Matricule}
            helperText={errors.Matricule ? <>{errors.Matricule}</>: 'Veulliez Entrer Votre Matricule'}
            />
          <TextField
            className="form-control"
            label="Grade"
            variant="outlined"
            style={{ marginBottom: '16px' }}
            onChangeHandler={onChangeHandler}
            onChange={e => setGrade(e.target.value)} 
            error={errors.Grade}
            helperText={errors.Grade ? <>{errors.Grade}</>: 'Veulliez Entrer Votre Grade'}/>
          <TextField
            className="form-control"
            label="Adresse Email"
            variant="outlined"
            style={{ marginBottom: '16px' }}
            onChangeHandler={onChangeHandler}
            onChange={e => setEmail(e.target.value)} 
            error={errors.Email}
            helperText={errors.Email ? <>{errors.Email}</>: 'Veulliez Entrer Votre Adresse Email'}/>
          <TextField
            className="form-control"
            label="N° GSM"
            variant="outlined"
            style={{ marginBottom: '16px' }}
            onChangeHandler={onChangeHandler}
            onChange={e => setNumeroGsm(e.target.value)} 
            error={errors.NumeroGsm}
            helperText={errors.NumeroGsm ? <>{errors.NumeroGsm}</>: 'Veulliez Entrer Votre N° GSM'}/>
       {/*  </div> */}
        {/* <div component="form" onSubmit={onSubmitHandler}> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <TextField
                className="form-control"

                label="N° GSM Personnel"
                variant="outlined"
                style={{ marginBottom: '16px' }}
                onChangeHandler={onChangeHandler}
                onChange={e => setNumeroGsmPersonnel(e.target.value)} 
                error={errors.NumeroGsmPersonnel}
                helperText={errors.NumeroGsmPersonnel ? <>{errors.NumeroGsmPersonnel}</>: 'Veulliez Entrer Votre N° GSM Personnel'}/>
              <TextField
                className="form-control"
                label="Tél Fixe"
                variant="outlined"               
                style={{ marginBottom: '16px' }}
                onChangeHandler={onChangeHandler}
                onChange={e => setTelephoneFixe(e.target.value)} 
                error={errors.TelephoneFixe}
                helperText={errors.TelephoneFixe ? <>{errors.TelephoneFixe}</>: 'Veulliez Entrer Votre Tél Fixe'}/>
              <TextField
                className="form-control"
                label="N° Permis de conduire"
                variant="outlined"
                style={{ marginBottom: '16px' }}
                onChangeHandler={onChangeHandler}
                onChange={e => setPermis(e.target.value)} 
                error={errors.Permis}
                helperText={errors.Permis ? <>{errors.Permis}</>: 'Veulliez Entrer Votre N° Permis de conduire'}/>
              <DatePicker
              className="form-control"
                label="Date validité Permis"
                slotProps={{ textField: {
                   helperText :errors.DateValiditePermis ? <>{errors.DateValiditePermis}</> : 'Veulliez Entrer Votre Date validité Permis de conduire'
                    } }}
                style={{ marginBottom: '16px' }}
                variant="outlined"
                onChangeHandler={onChangeHandler}
                value={DateValiditePermis}
                onChange={handleDate1Change}
                error={errors.DateValiditePermis}/>
            </DemoContainer>
          </LocalizationProvider>
       {/*  </div> */}
        {/* <div component="form" onSubmit={onSubmitHandler}> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <TextField
                className="form-control"
                label="N° CIN"
                variant="outlined"
                style={{ marginBottom: '16px' }}
                onChangeHandler={onChangeHandler}
                onChange={e => setCIN(e.target.value)} 
                error={errors.CIN}
                helperText={errors.CIN ? <>{errors.CIN}</>: 'Veulliez Entrer Votre N° CIN'}/>
              <DatePicker
                className="form-control"
                label="Date validité CIN"
                variant="outlined"
                style={{ marginBottom: '16px' }}
                onChangeHandler={onChangeHandler}
                value={DateValiditéCIN}
                onChange={handleDate2Change} 
                error={errors.DateValiditéCIN}
                slotProps={{ textField: {
                  helperText :errors.DateValiditéCIN ? <>{errors.DateValiditéCIN}</> : 'Veulliez Entrer Votre Date validité CIN'
                   } }}/>
              <TextField
                className="form-control"
                label="N° Passeport"
                variant="outlined"
                style={{ marginBottom: '16px' }}
                onChangeHandler={onChangeHandler}
                onChange={e => setNumeroPassport(e.target.value)}
                error={errors.NumeroPassport}
                helperText={errors.NumeroPassport ? <>{errors.NumeroPassport}</>: 'Veulliez Entrer Votre N° Passeport'} />
              <DatePicker
              className="form-control"
                label="Date validité Passport"
                
                style={{ marginBottom: '16px' }}
                variant="outlined"
                onChangeHandler={onChangeHandler}
                value={DateValiditéPassport}
                onChange={handleDate3Change}
                error={errors.DateValiditéPassport}
                slotProps={{ textField: {
                     helperText :errors.DateValiditéPassport ? <>{errors.DateValiditéPassport}</> : 'Veulliez Entrer Votre Date validité Passeport'
                 } }}/>
            </DemoContainer>
          </LocalizationProvider>
        {/* </div> */}
      </Box>
    </div >
    <Stack direction="row" spacing={2} >{/*  onSubmit={onSubmitHandler} */}
        <Button variant="contained" endIcon={<SendIcon /> } onClick={CreateUser}   /* component={RouterLink} to={`http://localhost:3000/dashboard/collaborateur`}  */>
          Ajouter Collaborateur
        </Button>
        <Button variant="contained" component={RouterLink} to="/dashboard/collaborateur">Annuler</Button>
      </Stack>
      
      </>
    
  );
}