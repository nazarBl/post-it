import React from "react";
import { Button, Paper, TextField } from "@mui/material";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import style from "./AddPost.module.scss";

export const AddPost = () => {
  const [value, setValue] = React.useState("");

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large">
        Show preview
      </Button>
      <br />
      <br />
      <TextField
        classes={{ root: style.title }}
        variant="standard"
        placeholder="Post title..."
        fullWidth
      />
      <TextField
        classes={{ root: style.tags }}
        variant="standard"
        placeholder="Tags"
        fullWidth
      />
      <SimpleMDE
        className={style.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={style.buttons}>
        <Button size="large" variant="contained">
          Pubic post
        </Button>
        <Button size="large">Cancel</Button>
      </div>
    </Paper>
  );
};