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
  const [vehicules, setVehicules] = useState({});
  const [Num_parc, setNum_parc] = useState([]);
  const [WW, setWW] = useState([]);
  const [Num_Chassis, setNum_Chassis] = useState([]);
  const [DM_Circulation, setDM_Circulation] = useState([]);
  const [Pf, setPf] = useState([]);
  const [Num_Immat, setNum_Immat] = useState([]);
  const [Marque, setMarque] = useState([]);
  const [Couleur, setCouleur] = useState([]);
  const [Prestataire, setPrestataire] = useState([]);
  const [Font_Service, setFont_Service] = useState([]);
  const [Ref_Pneus, setRef_Pneus] = useState([]);
  const [Echeance_Aut_Circulation, setEcheance_Aut_Circulation] = useState([]);
  const [Echaence_Visite_Tech, setEchaence_Visite_Tech] = useState([]);
  const [Assurance_Contrat_Cours, setAssurance_Contrat_Cours] = useState(null);
  const [Cartes_Verte, setCartes_Verte] = useState(null);
  const [Vignete, setVignete] = useState(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const updatedVehicule = {
      Num_parc,
      WW,
      Num_Chassis,
      DM_Circulation,
      Pf,
      Num_Immat,
      Marque,
      Couleur,
      Prestataire,
      Font_Service,
      Ref_Pneus,
      Echeance_Aut_Circulation,
      Echaence_Visite_Tech,
      Assurance_Contrat_Cours,
      Cartes_Verte,
      Vignete,
    };
    axios
      .put(`http://localhost:3001/api/vehicule/${id}`, updatedVehicule)
      .then((res) => {
        console.log(res.data);
        setVehicules({});
        setErrors({});
        setMessage(res.data.message);
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
        Navigate('http://localhost:3000/dashboard/vehicule');
      })
      .catch((err) => {
        const errorMessage = err.response?.data ?? 'Une erreur s est produite.';
        setErrors(errorMessage);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/vehicule/${id}`)
      .then((res) => {
        const {
          Num_parc,
          WW,
          Num_Chassis,
          DM_Circulation,
          Pf,
          Num_Immat,
          Marque,
          Couleur,
          Prestataire,
          Font_Service,
          Ref_Pneus,
          Cartes_Verte,
        } = res.data;

        setNum_parc(Num_parc);
        setWW(WW);
        setNum_Chassis(Num_Chassis);
        setDM_Circulation(DM_Circulation);
        setPf(Pf);
        setNum_Immat(Num_Immat);
        setMarque(Marque);
        setCouleur(Couleur);
        setPrestataire(Prestataire);
        setFont_Service(Font_Service);
        setRef_Pneus(Ref_Pneus);
        setCartes_Verte(Cartes_Verte);

        setVehicules(res.data);
      })
      .catch((err) => {
        // Gérez les erreurs de requête ici
      });
  }, []);

  const handleDate1Change = (date) => {
    setEcheance_Aut_Circulation(date);
  };

  const handleDate2Change = (date) => {
    setEchaence_Visite_Tech(date);
  };

  const handleDate3Change = (date) => {
    setAssurance_Contrat_Cours(date);
  };
  const handleDate4Change = (date) => {
    setVignete(date);
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
          label="Num_parc"
          variant="outlined"
          style={{ marginBottom: '16px' }}
          onChange={(e) => setNum_parc(e.target.value)}
          value={Num_parc}
          error={errors.Num_parc}
          helperText={errors.Num_parc ? <>{errors.Num_parc}</> : 'Veulliez Entrer Votre Num_parc'}
        />
        <TextField
          focused
          className="form-control"
          label="WW"
          variant="outlined"
          style={{ marginBottom: '16px' }}
          value={WW}
          onChange={(e) => setWW(e.target.value)}
          error={errors.WW}
          helperText={errors.WW ? <>{errors.WW}</> : 'Veulliez Entrer Votre WW'}
        />

        <TextField
          focused
          className="form-control"
          label="Num_Chassis"
          variant="outlined"
          style={{ marginBottom: '16px' }}
          onChange={(e) => setNum_Chassis(e.target.value)}
          error={errors.Num_Chassis}
          value={Num_Chassis}
          helperText={errors.Num_Chassis ? <>{errors.Num_Chassis}</> : 'Veulliez Entrer Votre Num_Chassis'}
        />

        <TextField
          focused
          className="form-control"
          label="DM_Circulation"
          variant="outlined"
          style={{ marginBottom: '16px' }}
          onChange={(e) => setDM_Circulation(e.target.value)}
          error={errors.DM_Circulation}
          value={DM_Circulation}
          helperText={errors.DM_Circulation ? <>{errors.DM_Circulation}</> : 'Veulliez Entrer Votre DM_Circulation'}
        />
        <TextField
          focused
          className="form-control"
          label="Pf"
          variant="outlined"
          style={{ marginBottom: '16px' }}
          onChange={(e) => setPf(e.target.value)}
          error={errors.Pf}
          value={Pf}
          helperText={errors.Pf ? <>{errors.Pf}</> : 'Veulliez Entrer Votre Pf'}
        />
        <TextField
          focused
          className="form-control"
          label="Num_Immat"
          variant="outlined"
          style={{ marginBottom: '16px' }}
          onChange={(e) => setNum_Immat(e.target.value)}
          error={errors.Num_Immat}
          value={Num_Immat}
          helperText={errors.Num_Immat ? <>{errors.Num_Immat}</> : 'Veulliez Entrer Votre Num_Immat'}
        />
        <TextField
          focused
          className="form-control"
          label="Marque"
          variant="outlined"
          style={{ marginBottom: '16px' }}
          onChange={(e) => setMarque(e.target.value)}
          error={errors.Marque}
          value={Marque}
          helperText={errors.Marque ? <>{errors.Marque}</> : 'Veulliez Entrer Votre Marque'}
        />
        <TextField
          focused
          className="form-control"
          label="Couleur"
          variant="outlined"
          style={{ marginBottom: '16px' }}
          onChange={(e) => setCouleur(e.target.value)}
          error={errors.Couleur}
          value={Couleur}
          helperText={errors.Couleur ? <>{errors.Couleur}</> : 'Veulliez Entrer Votre Couleur'}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <TextField
              focused
              className="form-control"
              label="Prestataire"
              variant="outlined"
              style={{ marginBottom: '16px' }}
              onChange={(e) => setPrestataire(e.target.value)}
              error={errors.Prestataire}
              value={Prestataire}
              helperText={errors.Prestataire ? <>{errors.Prestataire}</> : 'Veulliez Entrer Votre Prestataire'}
            />
            <TextField
              focused
              className="form-control"
              label="Font_Service"
              variant="outlined"
              style={{ marginBottom: '16px' }}
              onChange={(e) => setFont_Service(e.target.value)}
              error={errors.Font_Service}
              value={Font_Service}
              helperText={errors.Font_Service ? <>{errors.Font_Service}</> : 'Veulliez Entrer Votre Font_Service'}
            />

            <TextField
              focused
              className="form-control"
              label="Ref_Pneus"
              variant="outlined"
              style={{ marginBottom: '16px' }}
              onChange={(e) => setRef_Pneus(e.target.value)}
              error={errors.Ref_Pneus}
              value={Ref_Pneus}
              helperText={errors.Ref_Pneus ? <>{errors.Ref_Pneus}</> : 'Veulliez Entrer Votre Ref_Pneus'}
            />

            <DatePicker
              className="form-control"
              label="Echeance_Aut_Circulation"
              slotProps={{
                textField: {
                  helperText: errors.Echeance_Aut_Circulation ? (
                    <>{errors.Echeance_Aut_Circulation}</>
                  ) : (
                    'Veulliez Entrer Votre Date validité Permis de conduire'
                  ),
                },
              }}
              style={{ marginBottom: '16px' }}
              variant="outlined"
              onChange={handleDate1Change}
              error={errors.Echeance_Aut_Circulation}
            />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              className="form-control"
              label="Echaence_Visite_Tech"
              style={{ marginBottom: '16px' }}
              variant="outlined"
              // value={Echaence_Visite_Tech}
              onChange={handleDate2Change}
              error={errors.Echaence_Visite_Tech}
              slotProps={{
                textField: {
                  helperText: errors.Echaence_Visite_Tech ? (
                    <>{errors.Echaence_Visite_Tech}</>
                  ) : (
                    'Veulliez Entrer Votre Date validité Passeport'
                  ),
                },
              }}
            />
            <DatePicker
              className="form-control"
              label="Assurance_Contrat_Cours"
              style={{ marginBottom: '16px' }}
              variant="outlined"
              value={Assurance_Contrat_Cours}
              onChange={handleDate3Change}
              error={errors.Assurance_Contrat_Cours}
              slotProps={{
                textField: {
                  helperText: errors.Assurance_Contrat_Cours ? (
                    <>{errors.Assurance_Contrat_Cours}</>
                  ) : (
                    'Veulliez Entrer Votre Date validité Passeport'
                  ),
                },
              }}
            />

            <TextField
              focused
              className="form-control"
              label="Cartes_Verte"
              variant="outlined"
              style={{ marginBottom: '16px' }}
              onChange={(e) => setCartes_Verte(e.target.value)}
              error={errors.Cartes_Verte}
              value={Cartes_Verte}
              helperText={errors.Cartes_Verte ? <>{errors.Cartes_Verte}</> : 'Veulliez Entrer Votre Cartes_Verte'}
            />

            <DatePicker
              className="form-control"
              label="Vignete"
              style={{ marginBottom: '16px' }}
              variant="outlined"
              // value={Vignete}
              onChange={handleDate4Change}
              error={errors.Vignete}
              slotProps={{
                textField: {
                  helperText: errors.Vignete ? <>{errors.Vignete}</> : 'Veulliez Entrer Votre Date validité Passeport',
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Stack direction="row" spacing={2}>
        {/* onClick={CreateUser} */}
        <Button variant="contained" endIcon={<SendIcon />} onClick={onSubmitHandler}>
          Modifier Collaborateur
        </Button>
        <Button variant="contained" component={RouterLink} to="/dashboard/vehicule">
          Annuler
        </Button>
      </Stack>
    </>
  );
}

/*  import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import {Link as RouterLink, useParams } from 'react-router-dom';
import { 
    Stack , 
    Button, 
    FormControl} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { useState  , useEffect } from 'react';
import BasicAlerts from 'src/components/Alert/alert1';

export default function ValidationTextFields() {
const { id } = useParams();
const [errors, setErrors] = useState({});
const [message, setMessage] = useState("");
const [show , setShow ] = useState(false) ;
const [form , setForm ] = useState({})
const [vehicules , setVehicules]=useState({}) 
const [Echeance_Aut_Circulation , setEcheance_Aut_Circulation]=useState([]) 
const [Echaence_Visite_Tech , setEchaence_Visite_Tech]=useState([])
const [Assurance_Contrat_Cours , setAssurance_Contrat_Cours]=useState(null)
const [Vignete , setVignete]=useState(null)


 const onChangeHandler = (e) => {
    setVehicules({
      ...vehicules,
      [e.target.name]: e.target.value,
    });
  }; 
 
  const onSubmitHandler1 = () => {
    axios.put(`http://localhost:3001/api/vehicule/${id}`,{ 
        Num_parc,
        WW,
        Num_Chassis ,
        DM_Circulation ,
        Pf ,
        Num_Immat ,
        Marque ,
        Couleur ,
        Prestataire ,
        Font_Service ,
        Ref_Pneus ,
        Echeance_Aut_Circulation ,
        Echaence_Visite_Tech ,
        Assurance_Contrat_Cours ,
        Cartes_Verte ,
        Vignete 
               })
          .then(res => {
              console.log(res.data)
              setVehicules({})
              setErrors({})
              setMessage(res.data.message)
              setShow(true)
              setTimeout(()=>{
               setShow(false)
              },4000);
          })
          .catch((err)=>setErrors(err.response.data))
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/api/vehicule/${id}`, vehicules)
      .then((res) => {
        navigate('/dashboard/vehicule'); // Mise à jour de la logique de navigation selon votre bibliothèque de routage
      })
      .catch((err) => setErrors(err.response.data));
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/api/vehicule/${id}`)
    .then((res) => {
       console.log(res);
      setVehicules(res.data);
    });
  }, []);
  

  const handleDate1Change = (date) => {
    setEcheance_Aut_Circulation(date);
  };

  const handleDate2Change = (date) => {
    setEchaence_Visite_Tech(date);
  };

  const handleDate3Change = (date) => {
    setAssurance_Contrat_Cours(date);
  };
  const handleDate4Change = (date) => {
    setVignete(date);
  };



return (
    <>
    <BasicAlerts message={message} show ={show} />
    

 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' , margin: '3%'}}>
   <TextField
   focused
     className="form-control"
     label="Num_parc"
     variant="outlined"
     style={{ marginBottom: '16px' }}
     error={errors.Num_parc} 
    // value={form.Num_parc }  
     helperText={errors.Num_parc ? <>{errors.Num_parc}</>: 'Veulliez Entrer Votre Num_parc'}
     onChange={onChangeHandler} />
   <TextField
   focused
     className="form-control"
     label="WW"
     variant="outlined"
     style={{ marginBottom: '16px' }}
     onChange={onChangeHandler} 
     error={errors.WW}
    //  value={vehicules.WW}  
     helperText={errors.WW ? <>{errors.WW}</>: 'Veulliez Entrer Votre WW'}/>

     <TextField
     focused
     className="form-control"
     label="Num_Chassis"
     variant="outlined"
     style={{ marginBottom: '16px' }}
     onChange={onChangeHandler}
     error={errors.Num_Chassis}
     // value={vehicules.Num_Chassis}  
     helperText={errors.Num_Chassis ? <>{errors.Num_Chassis}</>: 'Veulliez Entrer Votre Num_Chassis'}/>
   
   <TextField
   focused
     className="form-control"
     label="DM_Circulation"
     variant="outlined"
     style={{ marginBottom: '16px' }}
     onChange={onChangeHandler}
     error={errors.DM_Circulation}
     //value={vehicules.DM_Circulation}  
     helperText={errors.DM_Circulation ? <>{errors.DM_Circulation}</>: 'Veulliez Entrer Votre DM_Circulation'}/>
   <TextField
   focused
     className="form-control"
     label="Pf"
     variant="outlined"
     style={{ marginBottom: '16px' }}
     onChange={onChangeHandler}
     error={errors.Pf}
     // value={vehicules.Pf}  
     helperText={errors.Pf ? <>{errors.Pf}</>: 'Veulliez Entrer Votre Pf'}/>
   <TextField
   focused
     className="form-control"
     label="Num_Immat"
     variant="outlined"
     style={{ marginBottom: '16px' }}
     onChange={onChangeHandler} 
     error={errors.Num_Immat}
    //  value={vehicules.Num_Immat} 
     helperText={errors.Num_Immat ? <>{errors.Num_Immat}</>: 'Veulliez Entrer Votre Num_Immat'}/>
     <TextField
     focused
     className="form-control"
     label="Marque"
     variant="outlined"
     style={{ marginBottom: '16px' }}
     onChange={onChangeHandler} 
     error={errors.Marque}
     // value={vehicules.Marque}  
     helperText={errors.Marque ? <>{errors.Marque}</>: 'Veulliez Entrer Votre Marque'}/>
     <TextField
     focused
     className="form-control"
     label="Couleur"
     variant="outlined"
     style={{ marginBottom: '16px' }}
     onChange={onChangeHandler} 
     error={errors.Couleur}
     // value={vehicules.Couleur} 
     helperText={errors.Couleur ? <>{errors.Couleur}</>: 'Veulliez Entrer Votre Couleur'}/>
<LocalizationProvider dateAdapter={AdapterDayjs}>
<DemoContainer components={['DatePicker']}>
     <TextField
     focused
     className="form-control"
     label="Prestataire"
     variant="outlined"
     style={{ marginBottom: '16px' }}
     onChange={onChangeHandler} 
     error={errors.Prestataire}
     // value={vehicules.Prestataire} 
     helperText={errors.Prestataire ? <>{errors.Prestataire}</>: 'Veulliez Entrer Votre Prestataire'}/>
     <TextField
     focused
     className="form-control"
     label="Font_Service"
     variant="outlined"
     style={{ marginBottom: '16px' }}
     onChange={onChangeHandler} 
     error={errors.Font_Service}
    // value={vehicules.Font_Service} 
     helperText={errors.Font_Service ? <>{errors.Font_Service}</>: 'Veulliez Entrer Votre Font_Service'}/>
    
     <TextField
     focused
     className="form-control"
     label="Ref_Pneus"
     variant="outlined"
     style={{ marginBottom: '16px' }}
     onChange={onChangeHandler}
     error={errors.Ref_Pneus}
     // value={vehicules.Ref_Pneus}  
     helperText={errors.Ref_Pneus ? <>{errors.Ref_Pneus}</>: 'Veulliez Entrer Votre Ref_Pneus'}/>

   
       <DatePicker
       className="form-control"
         label="Echeance_Aut_Circulation"
         slotProps={{ textField: {
            helperText :errors.Echeance_Aut_Circulation ? <>{errors.Echeance_Aut_Circulation}</> : 'Veulliez Entrer Votre Date validité Permis de conduire'
             } }}
         style={{ marginBottom: '16px' }}
         variant="outlined"
         onChangeHandler={onChangeHandler} 

         onChange={handleDate1Change}
         error={errors.Echeance_Aut_Circulation}/>
</DemoContainer>
</LocalizationProvider>
<LocalizationProvider dateAdapter={AdapterDayjs}>
<DemoContainer components={['DatePicker']}>
     <DatePicker
       className="form-control"
         label="Echaence_Visite_Tech"       
         style={{ marginBottom: '16px' }}
         variant="outlined"
         onChangeHandler={onChangeHandler} 
         onChange={handleDate2Change}
         error={errors.Echaence_Visite_Tech}
         slotProps={{ textField: {
              helperText :errors.Echaence_Visite_Tech ? <>{errors.Echaence_Visite_Tech}</> : 'Veulliez Entrer Votre Date validité Passeport'
          } }}/>
     <DatePicker
       className="form-control"
         label="Assurance_Contrat_Cours"
         style={{ marginBottom: '16px' }}
         variant="outlined"
         onChangeHandler={onChangeHandler}
         
         onChange={handleDate3Change}
         error={errors.Assurance_Contrat_Cours}
         slotProps={{ textField: {
              helperText :errors.Assurance_Contrat_Cours ? <>{errors.Assurance_Contrat_Cours}</> : 'Veulliez Entrer Votre Date validité Passeport'
          } }}/>
     
 
   <TextField
   focused
     className="form-control"
     label="Cartes_Verte"
     variant="outlined"
     style={{ marginBottom: '16px' }}
    
     error={errors.Cartes_Verte}
     // value={vehicules.Cartes_Verte} 
     helperText={errors.Cartes_Verte ? <>{errors.Cartes_Verte}</>: 'Veulliez Entrer Votre Cartes_Verte'}
    onChange={onChangeHandler} />


     <DatePicker
       className="form-control"
         label="Vignete"
         style={{ marginBottom: '16px' }}
         variant="outlined"
         onChangeHandler={onChangeHandler} 
         onChange={handleDate4Change}
         error={errors.Vignete}    
         slotProps={{ textField: {
              helperText :errors.Vignete ? <>{errors.Vignete}</> : 'Veulliez Entrer Votre Date validité Passeport'
          } }}/>
     </DemoContainer>
   </LocalizationProvider>

  
    <Stack direction="row" spacing={2}  >{/* onClick={CreateUser} }
        <Button variant="contained" endIcon={<SendIcon />} onClick={onSubmitHandler}  > 
          Modifier Collaborateur
        </Button>
        <Button variant="contained" component={RouterLink} to="/dashboard/vehicule">Annuler</Button>
      </Stack>
</div>
      </>
    
  );

};

 */
