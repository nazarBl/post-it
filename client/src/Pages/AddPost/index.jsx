import React from "react";
import { Button, Paper, TextField } from "@mui/material";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import style from "./AddPost.module.scss";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkIfAuth } from "../../redux/slices/auth";

export const AddPost = () => {
  const isAuth = useSelector(checkIfAuth)
  const imageUrl = '';
  const [value, setValue] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('')

  const handleChangeFile = () => {};

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {
    setValue(value);

  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );
    if(!isAuth){
      return <Navigate to='/'/>
    }

  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large">
        Show preview
      </Button>
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Delete
        </Button>
      )}
      {imageUrl && (
        <img className={style.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: style.title }}
        variant="standard"
        placeholder="Post title..."
        value ={title}
        onChange={e=>setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: style.tags }}
        variant="standard"
        placeholder="Tags"
        value={tags}
        onChange={e=>setTags(e.target.value)}
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
        <a href = '/'>
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};