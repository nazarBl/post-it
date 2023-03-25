import React from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import {useForm} from 'react-hook-form';
import {Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {checkIfAuth, fetchUserData} from '../../redux/slices/auth'

import style from './Login.module.scss';

export const Login = () => {
  const isAuth = useSelector(checkIfAuth)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid,
  }} = useForm({
    defaultValues: {
      email:'',
      password:''
    }
  })
    const onSubmit = async (values)=>{
    const data = await dispatch(fetchUserData(values))
    if(!data.payload){
      return window.alert('Log In failed!')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if(isAuth){
    return <Navigate to='/' />
  }
  
  return (
    <Paper classes={{ root: style.root }}>
      <Typography classes={{ root: style.title }} variant="h5">
        Sign into account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={style.field}
          label="E-Mail"
          error ={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          {...register('email', {required:'Enter your email please'})}
        />  
        <TextField 
          classes={{ root: style.title }} 
          label="Password"  
          fullWidth
          helperText={errors.password?.message}
          error ={Boolean(errors.password?.message)}
          {...register('password',{required:'Enter password please'})}/>
        <Button disabled = {!isValid} type='submit' size="large" variant="contained" fullWidth>
          Log in
        </Button>
      </form>
    </Paper>
  );
};