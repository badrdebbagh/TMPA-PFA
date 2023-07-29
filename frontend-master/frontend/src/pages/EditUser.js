
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Navigate, useNavigate } from 'react-router-dom';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Stack } from '@mui/material';

export default function FormDialog() {
  const [users, setUsers] = useState({});
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  
  const onChangeHandler = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  };
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/api/users/${id}`, users)
      .then((res) => {
        navigate('/dashboard/user');
      })
      .catch((err) => setErrors(err.response.data));
  };
  
  useEffect(() => {
    axios.get(`http://localhost:3001/api/users/${id}`)
      .then((res) => {
        setUsers(res.data);
      });
  }, []);
  
  return (
    <>  
      
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' , margin: '3%'}}>
          
        
        <TextField
          focused
          className="form-control"
          label="Last name"
          variant="outlined" 
          /* style={{ marginBottom: '16px' }} */
          error={errors.lastname}
          value={users.lastname}
          name="lastname"
          onChange={onChangeHandler}
        />   
        <TextField
          focused
          className="form-control" 
          label="First name"
          variant="outlined" 
          /* style={{ marginBottom: '16px' }} */
          error={errors.firstname}
          value={users.firstname}
          name="firstname"
          onChange={onChangeHandler}
        />
        <TextField
          focused
          className="form-control" 
          label="Email"
          variant="outlined" 
          type="email"
         /*  style={{ marginBottom: '16px' }} */
          error={errors.email}
          value={users.email}
          name="email"
          onChange={onChangeHandler}
        />
        <TextField
          focused
          className="form-control" 
          label="Phone"
          variant="outlined" 
        /*  style={{ marginBottom: '16px' }} */
          error={errors.phone}
          value={users.phone}
          name="phone"
          onChange={onChangeHandler}
        />
        </div>
        <Stack direction="row" spacing={2}  >
        <Button variant="contained" component={RouterLink} to="/dashboard/user">Annuler</Button>
        <Button variant="contained" onClick={onSubmitHandler}>Enregistrer</Button>
      </Stack>
    </>
  );
}
