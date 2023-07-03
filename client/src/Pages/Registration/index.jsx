import React from "react";
import { Avatar, Button, Paper, TextField, Typography } from "@mui/material";
import {useForm} from 'react-hook-form';


import style from "./Registration.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { checkIfAuth, fetchRegister } from "../../redux/slices/authSlice";
import {Navigate} from 'react-router-dom'

export const Registration = () => {
  const isAuth = useSelector(checkIfAuth)
  const dispatch = useDispatch();

  const {register,
     handleSubmit,
     formState: {
      errors,
      isValid,
}} = useForm({
  defaultValues: {
  fullName:'',
  email:'',
  password:''
  },
  mode:'onChange',
});

const onSubmit = async (values)=>{
  const data = await dispatch(fetchRegister(values))

  if(!data.payload){
    return window.alert('Registration failed!')
  }

  if('token' in data.payload) {
    window.localStorage.setItem('token', data.payload.token)
  }
}

if(isAuth){
  return <Navigate to='/' />
}

  return (
    <Paper classes={{ root: style.root }}>
      <Typography classes={{ root: style.title }} variant="h5">
        Account registration
      </Typography>
      <div className={style.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
        {...register('fullName', {required:'Enter your full name please'})} 
        error= {Boolean(errors.fullName?.message)} 
        className={style.field} 
        label="Full Name"
        helperText={errors.fullName?.message}
        fullWidth />
        <TextField 
         {...register('email',{required:'Enter your email please'})}
         className={style.field}
         error= {Boolean(errors.email?.message)}
         helperText={errors.email?.message}
         label="E-mail" fullWidth />
        <TextField 
        {...register('password',{required:'Create your password please'})}
        className={style.field} 
        helperText={errors.password?.message} 
        error = {Boolean(errors.password?.message)}
        label="Password" fullWidth />
        <Button disabled = {!isValid} type = "submit" size="large" variant="contained" fullWidth>
          Sign Up
        </Button>
      </form>
     
    </Paper>
  );
};