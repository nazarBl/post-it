import React, { useRef, useState } from "react";

import style from "./AddComment.module.scss";

import { Avatar, Button, TextField} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom"
import { fetchCommentsByPostId} from "../../redux/slices/commentsSlice";
import axios from "../../axios.js";

export const AddComment = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state=>state.auth.userData)

  const {id} = useParams()
  const [commentText, setCommentText] = useState('')
  const textAreaRef = useRef()
  const params = {
    commentText,
    parentPost:id,
  }
  const sumbitComment = async (params,event)=>{
    event.preventDefault()
    axios.post('/comments/', params).then(res=>{
      dispatch(fetchCommentsByPostId(id))
      setCommentText('')
    })
  }

  const changeCommentText = (event) => {
    const newText = event.target.value
    setCommentText(newText)
  }
  
  return (
    <>
    {userData?(
      <div className={style.root}>
        <Avatar
          classes={{ root: style.avatar }}
          src={userData.avatarUrl?`http://localhost:7000${userData.avatarUrl}`:'/noavatar.png'}
        />
        <div className={style.form}>
          <TextField
            label="Leave a comment..."
            variant="outlined"
            ref={textAreaRef}
            value={commentText}
            maxRows={10}
            onChange={(e)=>changeCommentText(e)}
            multiline
            fullWidth
          />

          {/* SEND BUTTON */}
          <Button variant="contained" onClick ={(event)=>sumbitComment(params,event)}>Send</Button>
        </div>
      </div>) : 'Please Log in to leave a comment'
    }
    </>
  );
};