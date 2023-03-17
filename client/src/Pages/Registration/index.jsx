import React from "react";
import { Avatar, Button, Paper, TextField, Typography } from "@mui/material";

import style from "./Registration.module.scss";

export const Registration = () => {
  return (
    <Paper classes={{ root: style.root }}>
      <Typography classes={{ root: style.title }} variant="h5">
        Account registration
      </Typography>
      <div className={style.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField className={style.field} label="Full Name" fullWidth />
      <TextField className={style.field} label="E-mail" fullWidth />
      <TextField className={style.field} label="Password" fullWidth />
      <Button size="large" variant="contained" fullWidth>
        Sign Up
      </Button>
    </Paper>
  );
};