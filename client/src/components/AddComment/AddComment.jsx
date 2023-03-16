import React from "react";

import style from "./AddComment.module.scss";

import { Avatar, Button, TextField} from "@mui/material";

export const AddComment = () => {
  return (
    <>
      <div className={style.root}>
        <Avatar
          classes={{ root: style.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={style.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};