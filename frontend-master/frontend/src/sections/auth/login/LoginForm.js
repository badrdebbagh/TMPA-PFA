import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import React , { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from "../../../redux/actions/authActions";

// ----------------------------------------------------------------------

export default function LoginForm() {
 
  const dispatch =useDispatch();
  const errors = useSelector(state=>state.errors) 
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const[form , setForm] = useState({})

   const onChange = (e)=>{
    setForm({
  ...form ,
  [e.target.name]:e.target.value 
})
  } 
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(LoginAction(form ,navigate)) 
  };
  return (
    <>
      <Stack spacing={3} onSubmit={handleSubmit}>
        <TextField  name="email" label="Email address" 
        onChange={onChange} /* (e) =>{setEmail(e.target.value)} */
        style={{ marginBottom: '16px' }}
        error={errors.email}
        helperText={errors.email ? 'Invalid email address' : ''}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={onChange} /* (e) =>{setPassword(e.target.value)} */
          style={{ marginBottom: '16px' }}
          error={errors.password}
          helperText={errors.password ? 'Mot de pass Incorrect !' : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

   

      <LoadingButton fullWidth size="large" type="submit" variant="contained"  onClick={handleSubmit} > {/* */}
        Login
        
      </LoadingButton>
    </>
  );
}
