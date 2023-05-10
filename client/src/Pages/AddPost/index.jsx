import React from "react";
import { Button, Paper, TextField } from "@mui/material";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import style from "./AddPost.module.scss";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkIfAuth } from "../../redux/slices/auth";
import axios from '../../axios.js'

export const AddPost = () => {
  const isAuth = useSelector(checkIfAuth)
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('')

  const inputFileRef = React.useRef();
  const navigate = useNavigate();
  const {id} = useParams();
  const isEditing = Boolean(id)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const {data} = await axios.post('/upload', formData)
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('Error while uploading your file')
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async ()=>{
    try {
      const params = {
        title,
        text,
        tags,
        imageUrl,
      }

      const {data} = isEditing?
      await axios.patch(`/post/${id}`, params): // update post after editing
      await axios.post('/post/create', params)

      const _id = isEditing? id : data._id;
      navigate(`/post/${_id}`)
    } catch (error) {
      console.warn(error)
    }
  }
  
  React.useEffect(()=>{
    if(id){
      axios.get(`/post/${id}`).then(({data})=>{
        setTitle(data.title);
        setText(data.text);
        setTags(data.tags);
        setImageUrl(data.imageUrl);
      }).catch(err=>console.log(err))
    }
  },[id])

  const options = React.useMemo( // settings for SimpleMDE
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
      <Button onClick ={()=>inputFileRef.current.click()} variant="outlined" size="large"> Show preview </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Delete
          </Button>
          <img className={style.image} src={`http://localhost:7000${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField // Field for title
        classes={{ root: style.title }}
        variant="standard"
        placeholder="Post title..."
        value ={title}
        onChange={e=>setTitle(e.target.value)}
        fullWidth
      />
      <TextField // Field for tags
        classes={{ root: style.tags }}
        variant="standard"
        placeholder="Tags"
        value={tags}
        onChange={e=>setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE // Block for post text and tools panel
        className={style.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={style.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing?'Save':'Public post'}
        </Button>
        <a href = '/'>
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};