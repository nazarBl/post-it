import React from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';

import style from './Login.module.scss';

export const Login = () => {
  return (
    <Paper classes={{ root: style.root }}>
      <Typography classes={{ root: style.title }} variant="h5">
        Sign into account
      </Typography>
      <TextField
        className={style.field}
        label="E-Mail"
        error
        helperText="Wrong e-mail"
        fullWidth
      />
      <TextField classes={{ root: style.title }} label="Password" fullWidth />
      <Button size="large" variant="contained" fullWidth>
        Log in
      </Button>
    </Paper>
  );
};